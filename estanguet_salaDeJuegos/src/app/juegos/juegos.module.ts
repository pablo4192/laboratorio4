import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { HomeComponent } from './components/views/home/home.component';
import { AhorcadoComponent } from './components/pages/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './components/pages/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './components/pages/preguntados/preguntados.component';
import { JuegosPropioComponent } from './components/pages/juegos-propio/juegos-propio.component';
import { ChatComponent } from './components/pages/chat/chat.component';
import { PuntajesComponent } from './components/views/puntajes/puntajes.component';


@NgModule({
  declarations: [
    HomeComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    JuegosPropioComponent,
    ChatComponent,
    PuntajesComponent,
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
