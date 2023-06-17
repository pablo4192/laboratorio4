import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
