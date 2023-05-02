import { TipoPelicula } from "../enums/tipo-pelicula";

export class Pelicula {
    id:string|undefined;
    nombre:string|undefined;
    tipo:TipoPelicula|undefined;
    fecha_estreno:string|undefined; //Ver tipo Date
    cantidad_publico:number|undefined;
    img:string|undefined; //Url de la imagen //Ver como seria trayendola de la base de datos o Api

    constructor(nombre:string, tipo:TipoPelicula, fechaEstreno:string, cantidadPublico:number, img:string){
        this.nombre = nombre;
        this.tipo = tipo;
        this.fecha_estreno = fechaEstreno;
        this.cantidad_publico = cantidadPublico;
        this.img = img;
    } 
}
