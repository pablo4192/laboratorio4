export abstract class Usuario {
    id:string;
    nombre:string;
    apellido:string;
    edad:number;
    dni:string;
    mail:string;
    password:string;
    imgsPerfil:any[];

    constructor(nombre:string, apellido:string, edad:number, dni:string, mail:string, password:string, imgsPerfil:any[]){
       this.id = '';
       this.nombre = nombre;
       this.apellido = apellido;
       this.edad = edad;
       this.dni = dni;
       this.mail = mail;
       this.password = password;
       this.imgsPerfil = imgsPerfil;
    }

    abstract mostrar():void;
}
