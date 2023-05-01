import { Component, EventEmitter, Output } from '@angular/core';
import { Pelicula } from 'src/app/peliculas/entidades/pelicula';
import { TipoPelicula } from 'src/app/peliculas/enums/tipo-pelicula';


@Component({
  selector: 'app-pelicula-listado',
  templateUrl: './pelicula-listado.component.html',
  styleUrls: ['./pelicula-listado.component.css']
})
export class PeliculaListadoComponent {

  // peliculas:Pelicula[] = [
  //   new Pelicula('1', 'Robocop', TipoPelicula.Otros, Date.parse('1980-4-5'), 100000, './assets/posters/robocop.jpg'),
  //   new Pelicula('2', 'It', TipoPelicula.Terror, Date.parse('1986-8-25'), 400000, './assets/posters/it.jpg'),
  //   new Pelicula('3', 'Que paso ayer', TipoPelicula.Comedia, Date.parse('2010-9-15'), 200000, './assets/posters/quePasoAyer.jpg'),
  //   new Pelicula('4', 'Diario de una pasion', TipoPelicula.Amor, Date.parse('2000-4-5'), 150000, './assets/posters/diarioDeUnaPasion.jpg'),
  //   new Pelicula('5', 'Babylon', TipoPelicula.Otros, Date.parse('2022-11-26'), 300000, './assets/posters/babylon.jpg')
  // ];
  peliculas:Pelicula[] = [];
  @Output() peliculaSeleccionada = new EventEmitter<Pelicula>();

  constructor(){

  }

  ngOnInit():void{
    this.obtenerPeliculas();
  }

  // harcodearPeliculas():void{
  //   localStorage.setItem('peliculas', JSON.stringify(this.peliculas));
  // }

  obtenerPeliculas():void{
    this.peliculas = JSON.parse(localStorage.getItem('peliculas') as string);
    
  }

  emitirPeliculaAlPadre($event:Pelicula):void{
    this.peliculaSeleccionada.emit($event);
  }

}
