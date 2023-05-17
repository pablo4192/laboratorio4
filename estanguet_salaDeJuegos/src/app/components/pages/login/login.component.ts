import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { LoginService } from 'src/app/services/login.service';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario:Usuario;
  autoCompletado:boolean = false;
  noExiste:boolean = false;

  @ViewChild('inputUsr') inputUsrRef:ElementRef|undefined;
  @ViewChild('inputPass') inputPassRef:ElementRef|undefined;

  public formulario:FormGroup|any;

  constructor(
    private loginService:LoginService,
    private router:Router,
    private renderer2:Renderer2,
    private fb:FormBuilder
    ){
     
      this.usuario = new Usuario();
      
    }

  ngOnInit(): void {  
    this.formulario = this.fb.group({
      'usuario': ['', [Validators.required, Validators.email]], 
      'contrasenia': ['', [Validators.required, this.spacesValidator]]
    });
  }

  private spacesValidator(control:AbstractControl):object|null{

    let text:string = <string>control.value;
    let spaces:boolean = text.includes(' ');

    return spaces ? {spaces: true} : null;
  }

  public ingresar(){
    
    if(!this.autoCompletado)
    {
      this.usuario.mail = this.formulario.getRawValue().usuario;
      this.usuario.contrasenia = this.formulario.getRawValue().contrasenia;
    }
    
    this.loginService.Login(this.usuario)
    .then(() => {
      this.loginService.actualizarUltimaConexion(this.usuario);
      this.router.navigate(['/home']);
    })
    .catch(error => {
      if(error.code == 'auth/user-not-found'){
        this.noExiste = true;
      }
    });
  }

  public AutoCompletarLogin(){  

    this.autoCompletado = true;

    this.renderer2.setProperty(this.inputUsrRef?.nativeElement, 'value', 'estanguet570@gmail.com');
    this.renderer2.setProperty(this.inputPassRef?.nativeElement, 'value', 'aaa000');

    this.usuario.mail = 'estanguet570@gmail.com';
    this.usuario.contrasenia = 'aaa000';
      
  }
}
