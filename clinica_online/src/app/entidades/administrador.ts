import { Usuario } from "./usuario";

export class Administrador extends Usuario{

    constructor(nombre:string, apellido:string, edad:number, dni:string, mail:string, password:string){
        super(nombre, apellido, edad, dni, mail, password);

    }

    override mostrar(): void {
        console.log(this);
    }
}
