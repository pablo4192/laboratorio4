import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Actor } from '../actores/entidades/actor';
import { Pelicula } from '../peliculas/entidades/pelicula';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) { }

  addPelicula(pelicula:Pelicula):void{
    const coleccion = collection(this.firestore, 'peliculas');
    addDoc(coleccion, {}).then((ref) => {
      setDoc(ref, {
        id:ref.id,
        nombre:pelicula.nombre,
        tipo:pelicula.tipo,
        fecha_estreno:pelicula.fecha_estreno,
        cantidad_publico:pelicula.cantidad_publico,
        img:pelicula.img
      })
    });
  }

  getPeliculas():Observable<Pelicula[]>{
    const coleccion = collection(this.firestore, 'peliculas');
    return collectionData(coleccion) as Observable<Pelicula[]>; 
  }

  addActor(actor:Actor):void{
    const coleccion = collection(this.firestore, 'actores');
    addDoc(coleccion, {}).then((ref) => {
      setDoc(ref, {
        id:ref.id,
        nombre:actor.nombre,
        apellido:actor.apellido, 
        fecha_nacimiento:actor.fechaNacimiento, 
        pais:actor.paisOrigen
      });
    });
  }

  getActores():Observable<Actor[]>{
    const coleccion = collection(this.firestore, 'actores');
    return collectionData(coleccion) as Observable<Actor[]>;
  }
}
