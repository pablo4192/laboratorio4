import { Component, Input } from '@angular/core';
import { Pelicula } from 'src/app/peliculas/entidades/pelicula';

@Component({
  selector: 'app-bdm-pelicula-style',
  templateUrl: './bdm-pelicula-style.component.html',
  styleUrls: ['./bdm-pelicula-style.component.css']
})
export class BdmPeliculaStyleComponent {
  @Input() titulo:string = ''; 
  @Input() pelicula:Pelicula|undefined;
}
