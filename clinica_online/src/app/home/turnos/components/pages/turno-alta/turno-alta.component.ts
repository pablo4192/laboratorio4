import { Component, Renderer2 } from '@angular/core';
import { Paciente } from 'src/app/entidades/paciente';
import { Profesional } from 'src/app/entidades/profesional';
import { Turno } from 'src/app/entidades/turno';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno-alta',
  templateUrl: './turno-alta.component.html',
  styleUrls: ['./turno-alta.component.scss']
})
export class TurnoAltaComponent {
  
  fecha_actual:Date = new Date();
  
  fechas:number[] = [];
  horarios:string[] = [];

  profesionales:Profesional[] = [];
  profesional_seleccionado:Profesional|undefined;
  
  nombre_apellido_prof:string = '';
  especialidad_seleccionada:string = '';
  fecha_seleccionada:string = '';
  horario_seleccionado:string = '';

  constructor(private fs:FirestoreService,
              private ts:TurnoService,
              private r2:Renderer2){

  }

  ngOnInit():void{
    this.obtenerFechas();
    this.obtenerHorarios();
  }

  getProfesionales($event:string):void{
    this.especialidad_seleccionada = $event;

    this.fs.getProfesionalesPorEspecialidad($event).then((docs) => {
      
      this.profesionales.splice(0, this.profesionales.length);

      docs.forEach((d) => {
        this.profesionales.push(d.data() as Profesional);
      });

    });
  }

  asignarProfesional(profesional:Profesional){
    this.profesional_seleccionado = profesional;
    this.nombre_apellido_prof = `${profesional.nombre} ${profesional.apellido}`; 
  }

  asignarFecha(fecha:number):void{
    let f:Date = new Date(fecha);
    let dia = f.getDate();
    let mes = f.getMonth() + 1;
    let anio = f.getFullYear();

    this.fecha_seleccionada = `${dia}/${mes}/${anio}`;
    
    if(this.profesional_seleccionado){
      this.fs.getUsuarioPorId(this.profesional_seleccionado.id)
      .then((docs) => {
        docs.forEach((d) => {
          let prof = d.data() as Profesional;
          
          prof.turnos.forEach((t_id) => {
            this.ts.getTurnoPorId(t_id)
            .then((docs) => {
              docs.forEach((d) => {
  
                let t = d.data() as Turno;
                this.verificarFechaHora(t.fecha, t.hora);
              
              })
            });
  
          })
        });
      })
    }
  }

  asignarHorario(horario:string):void{
    this.horario_seleccionado = horario;
  }

  obtenerFechas():void{ 
    let fecha_unix:number = this.fecha_actual.getTime();
    let date:Date;
    let var_control:number = 18;

    if(this.fecha_actual.getDay() == 4 || this.fecha_actual.getDay() == 5 || this.fecha_actual.getDay() == 6){
      var_control = 19;
    }
  
    for(let i = 1; i < var_control; i++){

      date = new Date(fecha_unix + (24*60*60*1000) * i);
     
      if(date.getDay() != 0)
      this.fechas.push(fecha_unix + (24*60*60*1000) * i);
 
    } 
  }

  obtenerHorarios():void{
    let dia_actual:number = this.fecha_actual.getDay();
    let hora:number = 9;
    let minutos:number;
    let hora_de_cierre:number = 19;
    let flag:boolean = false;

    if(dia_actual == 6){
      hora_de_cierre = 14;
    }

    do{
      if(flag){
        minutos = 30;
      }
      else{
        minutos = 0;
      }
      
      if(minutos == 0){
        this.horarios.push(`${hora}:${minutos}0`);
      }
      else{
        this.horarios.push(`${hora}:${minutos}`);
      }

      if(minutos == 30){
        hora++;
      }

      flag = !flag;
    }while(hora < hora_de_cierre);

  }

  confirmarTurno():void{
    if(this.especialidad_seleccionada != '' &&
      this.nombre_apellido_prof != '' &&
      this.fecha_seleccionada != '' &&
      this.horario_seleccionado != ''){
        
        const datos_paciente = {
          id: this.fs.usr_en_sesion?.id,
          nombre: this.fs.usr_en_sesion?.nombre,
          apellido: this.fs.usr_en_sesion?.apellido,
          mail: this.fs.usr_en_sesion?.mail
        } 

        const datos_profesional = {
          id: this.profesional_seleccionado?.id,
          nombre: this.profesional_seleccionado?.nombre,
          apellido: this.profesional_seleccionado?.apellido,
          mail: this.profesional_seleccionado?.mail
        }
       
        let turno:Turno = new Turno(datos_paciente, datos_profesional, this.especialidad_seleccionada, this.fecha_seleccionada, this.horario_seleccionado); 
        
        this.ts.addTurno(turno);
      }
      else{
        console.log("Faltan completar campos");
      }
  }

  verificarFechaHora(fecha:string, hora:string){
    if(this.fecha_seleccionada == fecha){
      let index = this.horarios.indexOf(hora);

      this.horarios.splice(index, 1);

      console.log(index);
      console.log(this.horarios);
    }
  }

}
