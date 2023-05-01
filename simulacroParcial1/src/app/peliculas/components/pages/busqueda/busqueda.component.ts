import { Component } from '@angular/core';
import { Pelicula } from 'src/app/peliculas/entidades/pelicula';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  peliculaSeleccionada:Pelicula|undefined;

  asignarSeleccion($event:Pelicula):void{
    this.peliculaSeleccionada = $event;
    
  }

}
