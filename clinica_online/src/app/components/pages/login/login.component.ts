import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Administrador } from 'src/app/entidades/administrador';
import { Paciente } from 'src/app/entidades/paciente';
import { Profesional } from 'src/app/entidades/profesional';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario:FormGroup|any;
  noExiste:boolean = false;
  noAutorizado:boolean = false;
  loading:boolean= false;
  textoAutorizacion:string = '';
  
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

  public get password() : any {
    return this.formulario.controls.password;
  }
  
  ngOnInit():void{
      this.formulario = this.fb.group({
        'mail' : ['', [Validators.required, Validators.email]],
        'password' : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]], 
      });
  }

  /**
   * Realiza el login al sistema
   */
  Ingresar():void{
    let usuario = this.formulario.getRawValue();
    this.loading = true;
    
    this.fs.login(usuario)
          .then((response) => {
            this.verificarUsuario(usuario, response);
          })
          .catch((error) => {
            this.loading = false;
            this.noExiste = true;
            console.log(error);
          });
  }

  /**
   * Verifica acceso o no el ingreso al sistema.
   * a) Si es paciente: Que haya verificado su mail al momento de registrarse.
   * b) Si es profesional: Verificación de mail y que un administrador haya habilitado su cuenta.
   * @param usuario 
   * @param respuesta 
   */
  private verificarUsuario(usuario:any, respuesta:UserCredential){
    
    if(respuesta.user.emailVerified){
      this.fs.getUsuarioPorMail(usuario.mail, 'usuarios')
      .then((docs) => {
        this.loading = false;

        if(docs.empty){
          this.noExiste = true;
          console.log('No se encontro en la base el mail suministrado');
        }
        else{
          docs.forEach((d) => {
            if(d.data()['tipo'] == 'paciente'){
            
              this.fs.esPaciente = true;
              this.fs.esProfesional = false;
              this.fs.esAdmin = false;

              this.fs.usr_en_sesion = d.data() as Paciente; 

              this.rt.navigate(['/home']);
              console.log('El usuario es paciente, tiene mail verificado, puede ingresar');
            }
            else if(d.data()['tipo'] == 'profesional'){
             
              if(d.data()['autorizado']){ 
                this.fs.esProfesional = true;
                this.fs.esPaciente = false;
                this.fs.esAdmin = false;

                this.fs.usr_en_sesion = d.data() as Profesional;

                this.rt.navigate(['/home']);
                console.log('El usuario es profesional, mail verificado y autorizado por admin, puede ingresar');
              }
              else{  
                this.noAutorizado = true;
                console.log('El usuario es profesional, tiene mail verificado pero no esta autorizado por el admin');
                this.textoAutorizacion = 'No es posible ingresar al sistema, por el momento su cuenta no ha sido autorizada por el administrador';
              }
            }
            else{
              
              this.fs.esAdmin = true;
              this.fs.esPaciente = false;
              this.fs.esProfesional = false;

              this.fs.usr_en_sesion = d.data() as Administrador;
              
              this.rt.navigate(['/home']);
              console.log('El usuario Administrativo, mail verificado, puede ingresar');
            }
            
          })
        }

      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
      });
    }
    else{
      this.loading = false;
      this.noAutorizado = true;
      console.log('El usuario no verifico el mail');
      this.textoAutorizacion = 'Le hemos enviado un mail a su correo, por favor verifique su identidad haciendo click en el enlace del mismo.'
    }
  }

  /**
   * Autocompleta los campos con mail y contraseña de un usuario registrado para realizar el login
   */
  public autoCompletarLogin(){  
    this.r2.setProperty(this.inputUsrRef?.nativeElement, 'value', 'sifek22374@akoption.com');
    this.r2.setProperty(this.inputPassRef?.nativeElement, 'value', 'ppp000');

    this.formulario.controls.mail.value = 'sifek22374@akoption.com';
    this.formulario.controls.password.value = 'ppp000';

    this.formulario.status = 'VALID';
  }
}
