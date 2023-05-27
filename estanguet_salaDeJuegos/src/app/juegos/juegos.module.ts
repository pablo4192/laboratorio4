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
import { FormsModule } from '@angular/forms';
import { TecladoComponent } from './components/views/teclado/teclado.component';
import { ModalPreguntaComponent } from './components/views/modal-pregunta/modal-pregunta.component';
import { ModalCategoriasComponent } from './components/views/modal-categorias/modal-categorias.component';
import { ColorCategoriaDirective } from '../directives/color-categoria.directive';
import { ModalFinDeJuegoComponent } from './components/views/modal-fin-de-juego/modal-fin-de-juego.component';



@NgModule({
  declarations: [
    HomeComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    JuegosPropioComponent,
    ChatComponent,
    PuntajesComponent,
    TecladoComponent,
    ModalPreguntaComponent,
    ModalCategoriasComponent,
    ColorCategoriaDirective,
    ModalFinDeJuegoComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }
