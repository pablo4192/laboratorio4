import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mail:string|undefined;
  contrasenia:string|undefined;

  flagError:boolean = false;
  flagExito:boolean = false;

  login():void{
    if(this.mail && this.contrasenia){
      localStorage.setItem(this.mail, this.contrasenia);
      this.mail = '';
      this.contrasenia = '';

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
