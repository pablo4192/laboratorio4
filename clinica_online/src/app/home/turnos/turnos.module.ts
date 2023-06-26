import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { TurnoAltaComponent } from './components/pages/turno-alta/turno-alta.component';
import { MisTurnosComponent } from './components/pages/mis-turnos/mis-turnos.component';
import { RegistroModule } from 'src/app/registro/registro.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TurnosComponent,
    TurnoAltaComponent,
    MisTurnosComponent,
 
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    RegistroModule,
    FormsModule
  ]
})
export class TurnosModule { }
