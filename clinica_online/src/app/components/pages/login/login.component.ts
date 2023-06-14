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
  noAutorizado:boolean = false;
  loading:boolean= false;
  autoCompletado:boolean = false;
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
   * Realiza el login del usuario verificando si esta autorizado para ingresar al sistema
   */
  Ingresar():void{
    let usuario = this.formulario.getRawValue();
    
    this.fs.login(usuario)
          .then((response) => {
  
            if(response.user.emailVerified){
              this.fs.getUsuarioPorMail(usuario.mail, 'profesionales')
              .then((docs) => {
                
                if(docs.empty){
                  this.rt.navigate(['/home']);
                  console.log('El usuario es paciente, mail verificado, puede ingresar')
                }
                else{
                  docs.forEach((d) => {
                    if(d.data()['autorizado']){
                      this.rt.navigate(['/home']);
                      console.log('El usuario es profesional, mail verificado y autorizado por admin, puede ingresar');
                    }
                    else{
                      this.noAutorizado = true;
                      console.log('El usuario es profesional, tiene mail verificado pero no esta autorizado por el admin');
                      this.textoAutorizacion = 'No es posible ingresar al sistema, por el momento su cuenta no ha sido autorizada por el administrador';
                    }
                  })
                }

              })

            }
            else{
              this.noAutorizado = true;
              console.log('El usuario no verifico el mail');
              this.textoAutorizacion = 'Le hemos enviado un mail a su correo, por favor verifique su identidad haciendo click en el enlace del mismo.'
            }

          })
          .catch((error) => {
            this.loading = false;
            this.noExiste = true;
            console.log(error);
          });

    // this.fs.getUsuarioPorMail(usuario.mail, 'profesionales')
    // .then((docs) => {
    //   docs.forEach((d) => {
    //     if(d.data()['autorizado']){
    //       this.loading = true;

    //       this.fs.login(usuario)
    //       .then((response) => {
    //         console.log(response);

    //         if(response.user.emailVerified){
    //           this.rt.navigate(['/home']);
    //         }
    //         else{
    //           console.log('El usuario no verifico el mail');
    //         }

    //       })
    //       .catch((error) => {
    //         this.loading = false;
    //         this.noExiste = true;
    //         console.log(error);
    //       });
        
    //     }
    //     else{
    //       this.noAutorizado = true;
    //     }

    //   });
    // })
    // .catch((error) => console.log(error));
  }

  /**
   * Autocompleta los campos para realizar el login al sistema
   */
  public autoCompletarLogin(){  
    this.autoCompletado = true;

    this.r2.setProperty(this.inputUsrRef?.nativeElement, 'value', 'estanguet@gmail.com');
    this.r2.setProperty(this.inputPassRef?.nativeElement, 'value', 'bbb000');

    this.formulario.controls.mail.value = 'estanguet570@gmail.com';
    this.formulario.controls.password.value = 'bbb000';

    this.formulario.status = 'VALID';
  }
}
