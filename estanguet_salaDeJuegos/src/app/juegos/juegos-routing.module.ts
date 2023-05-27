import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { AhorcadoComponent } from './components/pages/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './components/pages/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './components/pages/preguntados/preguntados.component';
import { JuegosPropioComponent } from './components/pages/juegos-propio/juegos-propio.component';


const routes: Routes = [
  {path: 'ahorcado', component:AhorcadoComponent},
  {path: 'mayor-menor', component:MayorMenorComponent},
  {path: 'preguntados', component:PreguntadosComponent},
  {path: 'juego-propio', component:JuegosPropioComponent},
  {path: 'home', component:HomeComponent},
  {path: '', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
