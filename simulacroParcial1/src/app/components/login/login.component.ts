import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  usuario:Usuario = new Usuario();
  mail:string = '';
  contrasenia:string = '';
 

  constructor(private router:Router){

  }

  ingresar():void{
    //HACER LA VALIDACION CORRESPONDIENTE
    this.router.navigate(['/peliculas']); 
  }

}
