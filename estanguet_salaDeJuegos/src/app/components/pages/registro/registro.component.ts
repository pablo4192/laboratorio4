import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { LoginService } from 'src/app/services/login.service';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  usuario:Usuario;
  verContrasenia:string = '';
  existe:boolean = false;

  public formulario:FormGroup|any;
    
  constructor(private loginService:LoginService,
              private router:Router,
              private fb:FormBuilder
    ) 
  {
    this.usuario = new Usuario();
  } 

  ngOnInit(): void {
      this.formulario = this.fb.group({
        'nombre': ['', [Validators.required, this.spacesValidator, Validators.pattern('[a-zA-Z]{1,20}')]],
        'apellido': ['', [Validators.required, this.spacesValidator, Validators.pattern('[a-zA-Z]{1,20}')]],
        'edad': ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
        'mail': ['', [Validators.required, Validators.email, this.spacesValidator]],
        'contrasenia': ['', [Validators.required, this.spacesValidator]],
        'verifContra': ['', [Validators.required]]
      });
  }

  public registrarse():void{
    this.usuario = this.formulario.getRawValue() as Usuario;
    this.GuardarUsuario();
  }

  private GuardarUsuario(){

    this.loginService.Registro(this.usuario)
    .then(() => {
      this.loginService.addUsuario(this.usuario); 
      this.router.navigate(["/home"]);
    })
    .catch(error => {
      if(error.code == 'auth/email-already-in-use'){
        this.existe = true;
      }
    });
    
  }

  private spacesValidator(control:AbstractControl):object|null{

    let text:string = <string>control.value;
    let spaces:boolean = text.includes(' ');

    return spaces ? {spaces: true} : null;
  }

}
