import { Component } from '@angular/core';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  usuario:Usuario = new Usuario();

  flagError:boolean = false;
  flagExito:boolean = false;

  registrarse():void{
    if(this.usuario.nombre && this.usuario.apellido && this.usuario.mail && this.usuario.contrasenia){
      
      localStorage.setItem(`usuario ${this.usuario.mail}` , JSON.stringify(this.usuario));
      
      this.usuario = new Usuario();

      this.flagError = false;
      this.flagExito = true;

      setTimeout(() => {
        this.flagExito = false;
      }, 3000);
      
    }
    else{
      this.flagError = true;  
      this.flagExito = false;
    }
  }
}
