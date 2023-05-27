import { Component } from '@angular/core';
import { Actor } from 'src/app/actores/entidades/actor';
import { Pelicula } from 'src/app/peliculas/entidades/pelicula';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.css']
})
export class PeliculaAltaComponent {

  actores:Actor[] = [];
  actorSeleccionado:Actor|undefined;
  event:any;
  pelicula:Pelicula;
  altaExitosa:boolean = false;


  constructor(private fs:FirestoreService){
    this.pelicula = new Pelicula();
  }

  ngOnInit():void{
    this.fs.getActores().subscribe((a) => {
      this.actores = a;   //Ver si hay que desuscribir
      
    });

  }

  altaPelicula():void{
    this.pelicula.actor = this.actorSeleccionado;

    this.fs.uploadImg(this.event.target.files[0])
    .then((response) => {
      this.pelicula.img = response.metadata.fullPath;
      this.fs.addPelicula(this.pelicula);
      
      this.reiniciar();
      
      this.altaExitosa = true;
      setTimeout(() => {
        this.altaExitosa = false;
      }, 2000);
    })
    .catch((error) => console.log(error));
  }

  manejarEventoActor($event:Actor):void{
    this.actorSeleccionado = $event;
    console.log(this.actorSeleccionado);
  } 

  private reiniciar():void{
    this.actorSeleccionado = undefined;
    this.pelicula = new Pelicula();
    this.event = undefined;
  }

}
