import { Usuario } from "./usuario";

export class Paciente extends Usuario{
    
    obra_social:string;

    constructor(nombre:string, apellido:string, edad:number, dni:string, mail:string, password:string, obra_social:string, imgsPerfil:any[]){
        super(nombre, apellido, edad, dni, mail, password, imgsPerfil);
        this.obra_social = obra_social;
    }

    override mostrar(): void {
        console.log(this);
    }
    

}
