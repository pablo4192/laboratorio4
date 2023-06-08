import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario:FormGroup|any;
  noExiste:boolean = false;
  loading:boolean= false;
  autoCompletado:boolean = false;
  
  @ViewChild('inputUsr') inputUsrRef:ElementRef|undefined;
  @ViewChild('inputPass') inputPassRef:ElementRef|undefined;

  constructor(private fb:FormBuilder,
    public fs:FirestoreService,
    private r2:Renderer2,
    private rt:Router){

  }

  public get mail() : any {
    return this.formulario.controls.mail;
  }

  
  public get contrasenia() : any {
    return this.formulario.controls.contrasenia;
  }
  
  ngOnInit():void{
      this.formulario = this.fb.group({
        'mail' : ['', [Validators.required, Validators.email]],
        'contrasenia' : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]], 
      });
  }

  //Arreglar...
  Ingresar():void{
    let usuario;

    if(this.autoCompletado){
      usuario = {
        mail: 'miguel@gmail.com',
        contrasenia : 'ddd000'
      }

      console.log(usuario);
    }
    else{
      usuario = this.formulario.getRawValue();
    }

    this.fs.login(usuario)
    .then(() => {
      
      setTimeout(() => {
        this.loading = false;
      }, 200);

      this.rt.navigate(['/home']);
    })
    .catch(error => {
      this.loading = false;
      console.log(error);

      if(error.code == 'auth/user-not-found' || "auth/missing-password"){
        this.noExiste = true;
      }
    });
  }

  public autoCompletarLogin(){  
    this.autoCompletado = true;

    this.r2.setProperty(this.inputUsrRef?.nativeElement, 'value', 'miguel@gmail.com');
    this.r2.setProperty(this.inputPassRef?.nativeElement, 'value', 'ddd000');
   
  }
}
