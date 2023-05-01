import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActoresRoutingModule } from './actores-routing.module';
import { ActorAltaComponent } from './actor-alta/actor-alta.component';
import { ActorListadoComponent } from './actor-listado/actor-listado.component';


@NgModule({
  declarations: [
    ActorAltaComponent,
    ActorListadoComponent
  ],
  imports: [
    CommonModule,
    ActoresRoutingModule
  ]
})
export class ActoresModule { }
