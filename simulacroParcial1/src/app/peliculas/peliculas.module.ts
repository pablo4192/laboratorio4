import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { BorrarPeliculaComponent } from './components/pages/borrar-pelicula/borrar-pelicula.component';
import { BusquedaComponent } from './components/pages/busqueda/busqueda.component';
import { DetallePeliculaComponent } from './components/pages/detalle-pelicula/detalle-pelicula.component';
import { ModificarPeliculaComponent } from './components/pages/modificar-pelicula/modificar-pelicula.component';
import { PeliculaAltaComponent } from './components/pages/pelicula-alta/pelicula-alta.component';
import { PeliculaListadoComponent } from './components/pages/pelicula-listado/pelicula-listado.component';
import { BdmPeliculaStyleComponent } from './components/views/bdm-pelicula-style/bdm-pelicula-style.component';
import { TablaPeliculaComponent } from './components/views/tabla-pelicula/tabla-pelicula.component';
import { PeliculasComponent } from './components/views/peliculas/peliculas.component';
import { TablaActoresComponent } from './components/views/tabla-actores/tabla-actores.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BusquedaComponent,
    BorrarPeliculaComponent,
    DetallePeliculaComponent,
    ModificarPeliculaComponent,
    PeliculaAltaComponent,
    PeliculaListadoComponent,
    BdmPeliculaStyleComponent,
    TablaPeliculaComponent,
    PeliculasComponent,
    TablaActoresComponent,
    
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    FormsModule
  ]
})
export class PeliculasModule { }
