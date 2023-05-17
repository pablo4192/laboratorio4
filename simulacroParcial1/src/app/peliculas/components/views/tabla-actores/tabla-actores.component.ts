import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Actor } from 'src/app/actores/entidades/actor';

@Component({
  selector: 'app-tabla-actores',
  templateUrl: './tabla-actores.component.html',
  styleUrls: ['./tabla-actores.component.css']
})
export class TablaActoresComponent {

  @Input() actores:Actor[] = [];
  @Output() actorSeleccionado = new EventEmitter<Actor>();
  
  emitirActor(actor:Actor):void{
    this.actorSeleccionado.emit(actor);
  }
}
