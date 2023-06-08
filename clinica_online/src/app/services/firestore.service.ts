import { Injectable } from '@angular/core';
import { Firestore, addDoc, setDoc, collection, collectionData, DocumentData } from '@angular/fire/firestore';
import { Usuario } from '../entidades/usuario';
import { Paciente } from '../entidades/paciente';
import { Profesional } from '../entidades/profesional';
import { Administrador } from '../entidades/administrador';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface especialidad{
  id:string;
  nombre:string;
}

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  esPaciente:boolean = false; 

  constructor(private fire:Firestore,
              private auth:Auth) { }

  //VERIFICAR MAIL
  registro(usuario:Usuario):Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.auth, usuario.mail, usuario.password);
  }

  login(usuario:Usuario):Promise<UserCredential>{
    return signInWithEmailAndPassword(this.auth, usuario.mail, usuario.password);
  }

  addUsuario(usuario:Usuario):void{
    if(usuario instanceof Paciente){
      this.addPaciente(usuario);
    }
    else if(usuario instanceof Profesional){
      this.addProfesional(usuario);
    }
    else{
      this.addAdministrador(usuario);
    }
  }

  private addPaciente(paciente:Paciente){
    const usrRef = collection(this.fire, 'pacientes');
    addDoc(usrRef, {})
    .then((refDoc) => {
      setDoc(refDoc, {
        id: refDoc.id,
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        edad: paciente.edad,
        dni: paciente.dni,
        mail: paciente.mail,
        especialidad: paciente.obra_social,
        password: paciente.password,
        img: paciente.imgsPerfil
      });
    });

  }

  private addProfesional(profesional:Profesional):void{
    const usrRef = collection(this.fire, 'profesionales');
    addDoc(usrRef, {})
    .then((refDoc) => {
      setDoc(refDoc, {
        id: refDoc.id,
        nombre: profesional.nombre,
        apellido: profesional.apellido,
        edad: profesional.edad,
        dni: profesional.dni,
        mail: profesional.mail,
        especialidad: profesional.especialidad,
        password: profesional.password,
        img: profesional.imgsPerfil,
        autorizado: profesional.autorizado
      });
    });
  }

  private addAdministrador(administrador:Administrador):void{

    //Codigo...
  }

  getEspecialidades():Observable<especialidad[]>{
    const espRef = collection(this.fire, 'especialidades');
    return collectionData(espRef,{idField: 'id'}) as Observable<especialidad[]>;
  }

  addEspecialidad(especialidad:string){
    const espRef = collection(this.fire, 'especialidades');
    addDoc(espRef, {})
    .then((refDoc) => {
      setDoc(refDoc, {
        id: refDoc.id,
        nombre: especialidad
      });
    });
  }
}
