import { Tipo } from "../enums/tipo";

export abstract class Usuario {
    id:string;
    nombre:string;
    apellido:string;
    edad:number;
    dni:string;
    mail:string;
    password:string;
    tipo:Tipo|undefined;

    constructor(nombre:string, apellido:string, edad:number, dni:string, mail:string, password:string){
       this.id = '';
       this.nombre = nombre;
       this.apellido = apellido;
       this.edad = edad;
       this.dni = dni;
       this.mail = mail;
       this.password = password;
    }

    abstract mostrar():void;
}
