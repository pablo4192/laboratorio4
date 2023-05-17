export class Usuario {
    id:string = '';
    nombre:string = '';
    apellido:string = '';
    edad:number = 0;
    mail:string = '';
    contrasenia:string = '';
    puntaje_acumulado:number;
    ultima_conexion:string = '';
        
    public constructor()
    {
        this.puntaje_acumulado = 0;
    }
}
