import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule)},
  {path: 'turnos', loadChildren: () => import('./turnos/turnos.module').then((m) => m.TurnosModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
