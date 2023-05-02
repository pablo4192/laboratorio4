import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorComponent } from './components/views/actor/actor.component';
import { ActorAltaComponent } from './components/pages/actor-alta/actor-alta.component';

const routes: Routes = [
  {path: '', component:ActorComponent},
  {path: 'altaActor', component:ActorAltaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActoresRoutingModule { }
