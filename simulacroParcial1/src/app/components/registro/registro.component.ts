import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  usuario:Usuario = new Usuario();
  confContrasenia:string|undefined;
  
  ngOnInit(): void {
   
  }

  registrar():void{
    if(Object.keys(this.usuario).length == 4 && this.confContrasenia){
      localStorage.setItem(this.usuario.mail as string, JSON.stringify(this.usuario));
      this.usuario = new Usuario();
      this.confContrasenia = '';
    }
    else{
      console.log('Faltan completar campos');
    }
  }
}
