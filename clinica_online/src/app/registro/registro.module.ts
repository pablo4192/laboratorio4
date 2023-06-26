import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { LoadingComponent } from './components/views/loading/loading.component';
import { VerificacionMailComponent } from './components/views/verificacion-mail/verificacion-mail.component';
import { ModalEspecialidadComponent } from './components/views/modal-especialidad/modal-especialidad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OpenModalDirective } from '../directives/open-modal.directive';
import { EspecialidadComponent } from './components/views/especialidad/especialidad.component';



@NgModule({
  declarations: [
    RegistroComponent,
    LoadingComponent,
    VerificacionMailComponent,
    ModalEspecialidadComponent,
    OpenModalDirective,
    EspecialidadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
  ],

  exports: [
    RegistroComponent,
    EspecialidadComponent,
    LoadingComponent,
    VerificacionMailComponent,
    ModalEspecialidadComponent
  ],
})
export class RegistroModule { }
