import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './components/pages/busqueda/busqueda.component';
import { PeliculaAltaComponent } from './components/pages/pelicula-alta/pelicula-alta.component';
import { PeliculaListadoComponent } from './components/pages/pelicula-listado/pelicula-listado.component';
import { PeliculasComponent } from './components/views/peliculas/peliculas.component';


const routes: Routes = [
  {path: '', component:PeliculasComponent},
  {path:'busqueda', component:BusquedaComponent}, 
  {path: 'alta', component:PeliculaAltaComponent},
  {path: 'actores', loadChildren: () => import('./../actores/actores.module').then(m => m.ActoresModule)},
  //{path: 'listadoPeliculas', component:PeliculaListadoComponent} //Ver...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
