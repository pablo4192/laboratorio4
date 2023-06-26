import { Tipo } from "../enums/tipo";
import { Usuario } from "./usuario";

export class Paciente extends Usuario{
    
    obra_social:string;
    turnos:string[];

    constructor(nombre:string, apellido:string, edad:number, dni:string, mail:string, password:string, obra_social:string){
        super(nombre, apellido, edad, dni, mail, password);
        this.obra_social = obra_social;
        this.turnos = [];
        this.tipo = Tipo.Paciente;
    }

    override mostrar(): void {
        console.log(this);
    }
    

}
