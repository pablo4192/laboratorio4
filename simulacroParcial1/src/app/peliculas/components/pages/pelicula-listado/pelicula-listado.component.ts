import { Component, EventEmitter, Output } from '@angular/core';
import { Pelicula } from 'src/app/peliculas/entidades/pelicula';
import { TipoPelicula } from 'src/app/peliculas/enums/tipo-pelicula';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-pelicula-listado',
  templateUrl: './pelicula-listado.component.html',
  styleUrls: ['./pelicula-listado.component.css']
})
export class PeliculaListadoComponent {

  peliculas:Pelicula[] = [];
  @Output() peliculaSeleccionada = new EventEmitter<Pelicula>();

  constructor(private fs:FirestoreService){

  }

  ngOnInit():void{
    this.fs.getPeliculas().subscribe((p) => {
      this.peliculas = p; 
    });
  }

  emitirPeliculaAlPadre($event:Pelicula):void{
    this.peliculaSeleccionada.emit($event);
  }

}
