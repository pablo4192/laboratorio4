import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/pages/usuario/usuario.component';
import { UsuarioAltaComponent } from './components/pages/usuario-alta/usuario-alta.component';

const routes: Routes = [
  {path: '', component: UsuarioComponent},
  {path:'usuario-alta', component: UsuarioAltaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
