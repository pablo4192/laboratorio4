import { Component, Renderer2, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Administrador } from 'src/app/entidades/administrador';
import { Paciente } from 'src/app/entidades/paciente';
import { Profesional } from 'src/app/entidades/profesional';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnChanges{

  @ViewChild('file') fileRef:ElementRef|undefined;
  @Input() cambiarValidaciones:boolean = false;

  agregarEspecialidad:boolean = false;
  especialidad_seleccionada: string = '';
  avisar_carga_especialidades: boolean = false;

  paciente:Paciente|any;
  profesional:Profesional|any;
  admin:Administrador|any;

  imagenes:any;
  
  errorImgPaciente:boolean = false;
  errorImgProfesional:boolean = false;
  errorEspecialidad:boolean = false;
  
  altaExitosa:boolean = false;
  flagVerificacion:boolean = false;
  mailUsr:string = '';

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
    this.formulario = this.fb.group({
      'nombre' : ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      'apellido' : ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      'edad' : ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      'dni' : ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      'mail' : ['', [Validators.required, Validators.email]],
      'contrasenia' : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]], 
      'confirmar' : ['', [Validators.required]] 
    });

    if(this.fs.registrarPaciente){
      this.formulario.addControl('obra_social', new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{1,20}$')]));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formulario = this.fb.group({
      'nombre' : ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      'apellido' : ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      'edad' : ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      'dni' : ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      'mail' : ['', [Validators.required, Validators.email]],
      'contrasenia' : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]], 
      'confirmar' : ['', [Validators.required]] 
    });

    if(this.fs.registrarPaciente){
      this.formulario.addControl('obra_social', new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{1,20}$')]));
    }
  }
 
  abrirModalEspecialidad(){
    this.agregarEspecialidad = true;
  }

  spacesValidator(control:AbstractControl):null|object{
      const texto = control.value as string;
      const spaces = texto.includes(' ');

      return spaces ? {containSpaces : true} : null;
  }

  registrarse():void{
    let u = this.formulario.getRawValue();
    u.especialidad = this.especialidad_seleccionada;
    this.mailUsr = u.mail;

    if(this.fs.registrarPaciente){
      this.registrarPaciente(u);
    }
    else if(this.fs.registrarProfesional){
      this.registrarProfesional(u);
    }
    else{
      this.registrarAdmin(u);
    }
  }

  private registrarPaciente(paciente:any):void{
    if(!this.imagenes || this.imagenes && this.imagenes.files.length != 2){
      this.errorImgPaciente = true;
     }
     else{
       this.paciente = new Paciente(paciente.nombre, paciente.apellido, paciente.edad, paciente.dni, paciente.mail, paciente.contrasenia, paciente.obra_social);
       
       this.fs.registro(this.paciente)
       .then(() => {
         this.fs.addUsuario(this.paciente, this.imagenes.files);
         this.fs.verificarMail();

         if(!this.fs.esAdmin){
           this.flagVerificacion = true;
  
           setTimeout(() => {
             this.flagVerificacion = false;
  
             this.fs.logout();
             this.rt.navigate(['/login']);
           }, 5000);
          }
          else{
            this.altaExitosa = true;

            setTimeout(() => {
              this.reiniciarForm();
            }, 3000);
          }

       })
       .catch((error) => {
         console.log(error);
       });
     }
  }

  private registrarProfesional(profesional:any):void{
    if(this.especialidad_seleccionada == ''){
      this.errorEspecialidad = true;
      return;
    }
    
    if(!this.imagenes){
      this.errorImgProfesional = true;
    }
    else{
      this.profesional = new Profesional(profesional.nombre, profesional.apellido, profesional.edad, profesional.dni, profesional.mail, profesional.contrasenia, profesional.especialidad);
        
          this.fs.registro(this.profesional)
          .then(() => {
            this.fs.addUsuario(this.profesional, this.imagenes.files);
            this.fs.verificarMail();

            if(!this.fs.esAdmin){
              this.flagVerificacion = true;
              
              setTimeout(() => {
                this.flagVerificacion = false;
                
                this.fs.logout();
                this.rt.navigate(['/login']);
              }, 5000);
            }
            else{
              this.altaExitosa = true;

              setTimeout(() => {
                this.reiniciarForm();
              }, 3000);
            }
          })
          .catch((error) => {
            
            console.log(error)
          });
    }
  }

  private registrarAdmin(admin:any):void{
    if(!this.imagenes){
      this.errorImgProfesional = true;
    }
    else{
      this.admin = new Administrador(admin.nombre, admin.apellido, admin.edad, admin.dni, admin.mail, admin.contrasenia);
        
          this.fs.registro(this.admin)
          .then(() => {
            this.fs.addUsuario(this.admin, this.imagenes.files);
            this.fs.verificarMail();
            
            this.altaExitosa = true;

            setTimeout(() => {
              this.reiniciarForm();
            }, 3000);

          })
          .catch((error) => {
            
            console.log(error)
          });
    }
  }

  cerrarModalEspecialidad($event:any):void{
    this.agregarEspecialidad = false;
    this.avisar_carga_especialidades = !this.avisar_carga_especialidades;

  }

  manejarEventoEspecialidad($event:string):void{
    this.especialidad_seleccionada = $event;
  }

  private reiniciarForm():void{
    this.formulario.reset();
    this.r2.setProperty(this.fileRef?.nativeElement, 'value', '');
    this.errorImgPaciente = false;
    this.errorImgProfesional = false;
    this.altaExitosa = false;
    this.imagenes = undefined;
  }

}
