import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosComponent } from './turnos.component';
import { TurnoAltaComponent } from './components/pages/turno-alta/turno-alta.component';
import { MisTurnosComponent } from './components/pages/mis-turnos/mis-turnos.component';

const routes: Routes = [
  {path: 'turno-alta', component:TurnoAltaComponent},
  {path: 'mis-turnos', component:MisTurnosComponent},
  {path: '', component: TurnosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
