import { Component } from '@angular/core';
import { Actor } from 'src/app/actores/entidades/actor';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.css']
})
export class ActorAltaComponent {

  actor:Actor = new Actor();
  paisOrigen:string = '';
  altaExitosa:boolean = false;

  constructor(private firestoreService:FirestoreService){

  }

  ngOnInit():void{
     
  }

  manejadorEventoPais($event:string):void{
    this.paisOrigen = $event;
  }

  altaActor():void{
    this.actor.paisOrigen = this.paisOrigen;
    this.firestoreService.addActor(this.actor); //VALIDAR CAMPOS, FECHA VER QUE TIPO ES EL MAS PERFORMANTE
    
    this.reiniciarCampos();
    this.altaExitosa = true;
    setTimeout(() => {
      this.altaExitosa = false;
    }, 2000);
  }

  private reiniciarCampos():void{
    this.actor = new Actor();
    this.paisOrigen = '';
  }
}
