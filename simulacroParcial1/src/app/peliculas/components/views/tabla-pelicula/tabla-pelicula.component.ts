import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from 'src/app/peliculas/entidades/pelicula';

@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.css']
})
export class TablaPeliculaComponent {
  @Input() peliculas:Pelicula[] = [];
  @Output() peliculaSeleccionada = new EventEmitter<Pelicula>();

  constructor(){

  }

  ngAfterViewInit():void{
    
  }

  manejadorEventoSeleccion(pelicula:Pelicula):void{
    this.peliculaSeleccionada.emit(pelicula);
  }

}
