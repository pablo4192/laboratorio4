import { Component, Input, Output, EventEmitter, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-modal-especialidad',
  templateUrl: './modal-especialidad.component.html',
  styleUrls: ['./modal-especialidad.component.scss']
})
export class ModalEspecialidadComponent {
  @Input() agregarEspecialidad:boolean = false;
  @Output() modalCerrado = new EventEmitter<boolean>();
  @ViewChild('modalRef') modalRef:ElementRef|undefined;
  espaciosVacios:boolean = false;
  exito:boolean = false;
 
  public formulario:FormGroup|any;

  constructor(private fb:FormBuilder,
              private fs:FirestoreService,
              private r2:Renderer2){

  }

  public get especialidad() : any {
    return this.formulario.controls.especialidad;
  }
  
  ngOnInit():void{
    this.formulario = this.fb.group({
      'especialidad' : ['', [Validators.required, Validators.pattern('^[a-zA-Z0 ]{1,20}$')]]
    })
  }

  closeModal():void{
    this.r2.selectRootElement(this.modalRef?.nativeElement).close();
    this.modalCerrado.emit(true);
  }

  addEspecialidad():void{
    let nombreEspecialidad:string = this.formulario.getRawValue().especialidad.trim();

    if(nombreEspecialidad != ''){
      this.fs.addEspecialidad(nombreEspecialidad);
      this.espaciosVacios = false;
      this.exito = true;
      setTimeout(() => {
        this.modalCerrado.emit(true);
      }, 1500);
    }
    else{
      this.espaciosVacios = true;
    }
    
  }
  
}
