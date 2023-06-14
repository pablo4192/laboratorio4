import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { BienvenidoComponent } from './components/views/bienvenido/bienvenido.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenModalDirective } from './directives/open-modal.directive';
import { ModalEspecialidadComponent } from './components/views/modal-especialidad/modal-especialidad.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { VerificacionMailComponent } from './components/views/verificacion-mail/verificacion-mail.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    LoginComponent,
    RegistroComponent,
    OpenModalDirective,
    ModalEspecialidadComponent,
    LoadingComponent,
    VerificacionMailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
