import { TipoPelicula } from "../enums/tipo-pelicula";

export class Pelicula {
    id:string|undefined;
    nombre:string|undefined;
    tipo:TipoPelicula|undefined;
    fechaEstreno:number|0; //Ver tipo Date
    cantidadPublico:number|undefined;
    img:string|undefined; //Url de la imagen //Ver como seria trayendola de la base de datos o Api

    constructor(id:string, nombre:string, tipo:TipoPelicula, fechaEstreno:number, cantidadPublico:number, img:string){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.fechaEstreno = fechaEstreno;
        this.cantidadPublico = cantidadPublico;
        this.img = img;
    }
}
