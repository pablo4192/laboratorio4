import { Component, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tabla-usuarios-pendientes',
  templateUrl: './tabla-usuarios-pendientes.component.html',
  styleUrls: ['./tabla-usuarios-pendientes.component.scss']
})
export class TablaUsuariosPendientesComponent {

  users_sin_autorizacion:Usuario[] = [];
  @Output() emitir_usuario = new EventEmitter<Usuario>();

  

  constructor(private fs:FirestoreService){


  }

  ngOnInit():void{
    this.fs.getUsuariosSinAutorizacion()
    .then((docs) => {
      if(docs.empty){
        console.log('No hay usuarios para autorizar');
      }
      else{
        docs.forEach((d) => {
          this.users_sin_autorizacion.push(d.data() as Usuario)
        });

      }
    })
    .catch((error) => console.log(error));
  }

  emitirUsuario($event:any, usuario:Usuario):void{
    $event.target.value = 'Autorizado';
    this.emitir_usuario.emit(usuario);
  }
}
