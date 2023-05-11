import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/views/bienvenido/bienvenido.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroComponent } from './components/pages/registro/registro.component';


const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'home', loadChildren: () => import('./juegos/juegos.module').then((m) => m.JuegosModule)},
  {path: '', component:BienvenidoComponent},
  {path:'**', component:BienvenidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
