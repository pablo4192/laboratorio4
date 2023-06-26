import { Estado } from "../enums/estado";
import { Paciente } from "./paciente";
import { Profesional } from "./profesional";

export class Turno {
    id:string = '';
    datos_paciente:object;
    datos_profesional:object;
    especialidad:string = '';
    fecha:string = '';
    hora:string = '';
    estado:Estado;

    constructor(datos_paciente:object, datos_profesional:object, especialidad:string, fecha:string, hora:string){  
        this.datos_paciente = datos_paciente;
        this.datos_profesional = datos_profesional;
        this.especialidad = especialidad;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = Estado.Solicitado;
    }
}
