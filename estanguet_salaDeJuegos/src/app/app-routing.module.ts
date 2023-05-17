import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/views/bienvenido/bienvenido.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { QuienSoyComponent } from './components/views/quien-soy/quien-soy.component';
import { ChatComponent } from './juegos/components/pages/chat/chat.component';
import { PuntajesComponent } from './juegos/components/views/puntajes/puntajes.component';


const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path: 'quienSoy', component:QuienSoyComponent},
  {path:'home', loadChildren: () => import('./juegos/juegos.module').then((m) => m.JuegosModule)},
  {path: 'chat', component:ChatComponent},
  {path: 'puntajes', component:PuntajesComponent},
  {path: '', component:BienvenidoComponent},
  {path:'**', component:BienvenidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
