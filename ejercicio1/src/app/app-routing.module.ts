import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes:Routes = [
  {path: 'bienvenido', component:BienvenidoComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: '', component:BienvenidoComponent},
  {path: '**', component:ErrorComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
