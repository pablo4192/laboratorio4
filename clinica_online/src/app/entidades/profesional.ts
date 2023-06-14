import { Usuario } from "./usuario";

export class Profesional extends Usuario{
    especialidad:string;
    autorizado:boolean;

    constructor(nombre:string, apellido:string, edad:number, dni:string, mail:string, password:string, especialidad:string){
        super(nombre, apellido, edad, dni, mail, password);
        this.especialidad = especialidad;
        this.autorizado = false;
    }

    override mostrar(){
        console.log(this);
    }
}
