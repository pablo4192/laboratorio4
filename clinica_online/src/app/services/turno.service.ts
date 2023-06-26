import { Injectable } from '@angular/core';
import { Turno } from '../entidades/turno';
import { Firestore, addDoc, setDoc, collection, collectionData, query, getDocs, where, updateDoc, doc } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import { Profesional } from '../entidades/profesional';
import { Paciente } from '../entidades/paciente';
import { Usuario } from '../entidades/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private fire:Firestore,
              private fs:FirestoreService) { }

  
  addTurno(turno:Turno):void{ 
    const turno_ref = collection(this.fire, 'turnos');

    addDoc(turno_ref, {})
    .then((refDoc) => {
      
      setDoc(refDoc, {
        id:refDoc.id,
        datos_paciente: turno.datos_paciente,
        datos_profesional: turno.datos_profesional,
        especialidad: turno.especialidad,
        fecha: turno.fecha,
        hora: turno.hora,
        estado: turno.estado
      })
      .then(() => {
        let paciente = turno.datos_paciente as Paciente;
        let profesional = turno.datos_profesional as Profesional

        this.bindearTurnos(paciente.id, refDoc.id);
        this.bindearTurnos(profesional.id, refDoc.id);
      })

    })
  }

  bindearTurnos(id_usr:string, id_turno:string){
    let usr:Profesional|Paciente;

    this.fs.getUsuarioPorId(id_usr)
    .then((docs) => {
      docs.forEach((d) => {
        usr = d.data() as Profesional|Paciente;
        usr.turnos.push(id_turno);

        this.updateTurnos(id_usr, usr.turnos)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      });
    });
  }

  updateTurnos(id_usr:string, nuevo_array:string[]):Promise<any>{
    const usrRef = doc(this.fire, `usuarios/${id_usr}`);
    return updateDoc(usrRef, {turnos: nuevo_array});
  }

  getTurnos():Observable<Turno[]>{
    const turnosRef = collection(this.fire, 'turnos');
    return collectionData(turnosRef,{idField: 'id'}) as Observable<Turno[]>;
  }

  getTurnoPorId(id:string){
    const collectionRef = collection(this.fire, 'turnos');
    let q = query(collectionRef, where('id', '==', id));

    return getDocs(q);
  }

  

}
