import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActoresRoutingModule } from './actores-routing.module';
import { ActorAltaComponent } from './components/pages/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './components/pages/actor-listado/actor-listado.component';
import { ActorComponent } from './components/views/actor/actor.component';
import { TablaPaisesComponent } from './components/pages/tabla-paises/tabla-paises.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActorAltaComponent,
    ActorListadoComponent,
    ActorComponent,
    TablaPaisesComponent
  ],
  imports: [
    CommonModule,
    ActoresRoutingModule,
    FormsModule
  ]
})
export class ActoresModule { }
