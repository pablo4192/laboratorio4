import { Component } from '@angular/core';
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
    this.usuario = JSON.parse(localStorage.getItem(this.mail) as string);
    
    if(this.usuario){                       //HACER LA VALIDACION CORRESPONDIENTE
      this.router.navigate(['/busqueda']);
    }
    else{
      console.log('Error no existe el usuario');
    }
  }

}
