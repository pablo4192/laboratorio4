import { Actor } from "src/app/actores/entidades/actor";
import { TipoPelicula } from "../enums/tipo-pelicula";

export class Pelicula {
    id:string|undefined;
    nombre:string|undefined;
    tipo:TipoPelicula|undefined;
    fecha_estreno:string|undefined; 
    cantidad_publico:number|undefined;
    actor:Actor|undefined;
    img:string|undefined;
}
