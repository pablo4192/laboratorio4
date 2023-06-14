import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/views/bienvenido/bienvenido.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { VerificacionMailComponent } from './components/views/verificacion-mail/verificacion-mail.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)},
  {path: 'verificacion-mail', component:VerificacionMailComponent},
  {path:'', component:BienvenidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
