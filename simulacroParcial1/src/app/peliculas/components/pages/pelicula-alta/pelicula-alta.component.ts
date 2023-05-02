import { Component } from '@angular/core';
import { Pelicula } from 'src/app/peliculas/entidades/pelicula';
import { TipoPelicula } from 'src/app/peliculas/enums/tipo-pelicula';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.css']
})
export class PeliculaAltaComponent {

  constructor(private fs:FirestoreService){

  }

  ngOnInit():void{
    //this.altaPelicula();
  }

  altaPelicula():void{
    // this.fs.addPelicula(new Pelicula('Robocop', TipoPelicula.Otros, '1980-4-5', 100000, './assets/posters/robocop.jpg'));
    // this.fs.addPelicula(new Pelicula('It', TipoPelicula.Terror, '1986-8-25', 400000, './assets/posters/it.jpg'));
    // this.fs.addPelicula(new Pelicula('Que paso ayer', TipoPelicula.Comedia, '2010-9-15', 200000, './assets/posters/quePasoAyer.jpg'));
    // this.fs.addPelicula(new Pelicula('Diario de una pasion', TipoPelicula.Amor, '2000-4-5', 150000, './assets/posters/diarioDeUnaPasion.jpg'));
    // this.fs.addPelicula(new Pelicula('Babylon', TipoPelicula.Otros, '2022-11-26', 300000, './assets/posters/babylon.jpg'));
  }
}
