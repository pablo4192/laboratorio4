import { Target } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Paciente } from 'src/app/entidades/paciente';
import { Profesional } from 'src/app/entidades/profesional';
import { FirestoreService, especialidad } from 'src/app/services/firestore.service';

@Component({ 
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{
  
  agregarEspecialidad:boolean = false;
  paciente:Paciente|any;
  profesional:Profesional|any;
  especialidades:especialidad[] = [];
  loading:boolean = false;
  imagenes:any;
  errorImgPaciente:boolean = false;
  errorImgProfesional:boolean = false;
  flagVerificacion:boolean = false;
  mailUsr:string = '';
  

  @ViewChild('lista_especialidades') espRef:ElementRef|undefined;
  public formulario:FormGroup|any;
  
  public get nombre() : any {
    return this.formulario.controls.nombre;
  }

  public get apellido() : any {
    return this.formulario.controls.apellido;
  }
    
  public get edad() : any {
    return this.formulario.controls.edad;
  }

  public get dni() : any {
    return this.formulario.controls.dni;
  }
  
  public get mail() : any {
    return this.formulario.controls.mail;
  }
    
  public get obra_social() : any {
    return this.formulario.controls.obra_social;
  }
  
  public get especialidad() : any {
    return this.formulario.controls.especialidad;
  }

  public get imagen() : any {
    return this.formulario.controls.imagen;
  }
  
  
  public get contrasenia() : any {
    return this.formulario.controls.contrasenia;
  }
 
  public get confirmar() : any {
    return this.formulario.controls.confirmar;
  }
  
  constructor(private fb:FormBuilder,
              public fs:FirestoreService,
              private r2:Renderer2,
              private rt:Router){

  }

  ngOnInit():void{
    //Si no hago el condicional no me toma el formulario valido, obra social => paciente; especialidad => Profesional. Ver!
    if(this.fs.esPaciente){
      this.formulario = this.fb.group({
        'nombre' : ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
        'apellido' : ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
        'edad' : ['', [Validators.required, Validators.min(1), Validators.max(120)]],
        'dni' : ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        'mail' : ['', [Validators.required, Validators.email]], //Validar que sea un mail real, ver funcion de firebase!
        'obra_social' : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{1,20}$')]], 
        'contrasenia' : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]], 
        'confirmar' : ['', [Validators.required]] //Validar que sea la misma contraseña
      });
    }
    else{
      this.formulario = this.fb.group({
        'nombre' : ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
        'apellido' : ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
        'edad' : ['', [Validators.required, Validators.min(1), Validators.max(120)]],
        'dni' : ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        'mail' : ['', [Validators.required, Validators.email]], //Validar que sea un mail real, ver funcion de firebase! 
        'especialidad' : ['', [Validators.required]],
        'contrasenia' : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]], 
        'confirmar' : ['', [Validators.required]] //Validar que sea la misma contraseña
      });
    }

    if(!this.fs.esPaciente)
    this.cargarEspecialidades();
    
  }

  private cargarEspecialidades(){
    let suscripcion:Subscription = this.fs.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
      suscripcion.unsubscribe();
      this.crearOpciones();
    });
  }

  private crearOpciones(){
    this.especialidades.forEach((e) => {
      let opcion = this.r2.createElement('option');
      this.r2.setAttribute(opcion, 'value', `${e.nombre}`);
      let texto = this.r2.createText(`${e.nombre}`);

      this.r2.appendChild(opcion, texto);
      this.r2.appendChild(this.espRef?.nativeElement, opcion);
    });
  }

  abrirModalEspecialidad(){
    this.agregarEspecialidad = true;
  }

  spacesValidator(control:AbstractControl):null|object{
      const texto = control.value as string;
      const spaces = texto.includes(' ');

      return spaces ? {containSpaces : true} : null;
  }

  //Ver si refactorizo haciendo 2 metodos mas chicos
  registrarse():void{
    let u = this.formulario.getRawValue();
    this.mailUsr = u.mail;
    
    if(this.fs.esPaciente){

      if(!this.imagenes || this.imagenes && this.imagenes.files.length != 2){
       this.errorImgPaciente = true;
      }
      else{
        this.paciente = new Paciente(u.nombre, u.apellido, u.edad, u.dni, u.mail, u.contrasenia, u.obra_social);
        
        this.fs.registro(this.paciente)
        .then(() => {
          this.fs.addUsuario(this.paciente, this.imagenes.files);
          this.fs.verificarMail();
          this.flagVerificacion = true;

          setTimeout(() => {
            this.flagVerificacion = false;

            this.fs.logout();
            this.rt.navigate(['/login']);
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
    else{
  
      if(!this.imagenes){
        this.errorImgProfesional = true;
      }
      else{
        this.profesional = new Profesional(u.nombre, u.apellido, u.edad, u.dni, u.mail, u.contrasenia, u.especialidad);
      
        this.fs.registro(this.profesional)
        .then(() => {
          this.fs.addUsuario(this.profesional, this.imagenes.files);
          this.fs.verificarMail();
          this.flagVerificacion = true;
          
          setTimeout(() => {
            this.flagVerificacion = false;
            
            this.fs.logout();
            this.rt.navigate(['/login']);
          }, 5000);
        })
        .catch((error) => {
          
          console.log(error)
        });
      }
    }
  }

  cerrarModalEspecialidad($event:any):void{
    this.agregarEspecialidad = false;
    this.cargarEspecialidades();
  }


}
