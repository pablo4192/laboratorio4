import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioComponent } from './components/pages/usuario/usuario.component';
import { UsuarioAltaComponent } from './components/pages/usuario-alta/usuario-alta.component';
import { RegistroModule } from 'src/app/registro/registro.module';
import { TablaUsuariosPendientesComponent } from './components/views/tabla-usuarios-pendientes/tabla-usuarios-pendientes.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioAltaComponent,
    TablaUsuariosPendientesComponent,
    
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    RegistroModule,
    
  ]
})
export class UsuariosModule { }
