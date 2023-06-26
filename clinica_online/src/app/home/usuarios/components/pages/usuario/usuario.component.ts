import { Component } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  constructor(private fs:FirestoreService){

  }

  autorizarAcceso($event:Usuario):void{
    this.fs.autorizarUsuario($event.id, true);
  }

  
}
