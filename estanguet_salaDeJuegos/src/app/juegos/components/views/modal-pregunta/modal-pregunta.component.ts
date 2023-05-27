import { Component, Renderer2, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Pregunta } from 'src/app/entidades/pregunta';

@Component({
  selector: 'app-modal-pregunta',
  templateUrl: './modal-pregunta.component.html',
  styleUrls: ['./modal-pregunta.component.scss']
})
export class ModalPreguntaComponent {

  @ViewChild('dialogRef') dialogRef:ElementRef|undefined;
  @Input() categoria:string|undefined;
  @Input() urlImg:string|undefined;
  @Input() pregunta:Pregunta|undefined;

  @Output() cerrarModalPadre = new EventEmitter<string>();

  opcion1:string = '';
  opcion2:string = '';
  opcion3:string = '';
  opcion4:string = '';

  @ViewChild('divResultado') resultadoRef:ElementRef|undefined;

  resultado:string = 'Respuesta incorrecta';
  mostrarResultado:boolean = false;

  respuestaCorrecta:boolean = false;
  respuestaIncorrecta:boolean = false;

  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
    if(this.pregunta != null){
      this.opcion1 = this.pregunta.opciones[0];
      this.opcion2 = this.pregunta.opciones[1];
      this.opcion3 = this.pregunta.opciones[2];
      this.opcion4 = this.pregunta.opciones[3];
    }
  }

  ngAfterViewInit():void{
      //this.renderer2.selectRootElement(this.dialogRef?.nativeElement).showModal(); //Por que lo abre sin contenido???
      this.dialogRef?.nativeElement.showModal();
      
      
  }

  verificarRespuesta($event:any):void{

    this.mostrarResultado = true;

    if(this.pregunta?.respuesta == $event.target.value){
      this.resultado = 'Respuesta correcta';
      this.renderer2.setStyle($event.target, 'backgroundColor', 'lime');
      
      setTimeout(() => {
        this.renderer2.setStyle(this.resultadoRef?.nativeElement, 'backgroundColor', 'lime')
      });

      this.respuestaCorrecta = true;
     
    }
    else{
      this.renderer2.setStyle($event.target, 'backgroundColor', '#F44336');

      setTimeout(() => {
        this.renderer2.setStyle(this.resultadoRef?.nativeElement, 'backgroundColor', '#F44336')
      });

      this.respuestaIncorrecta = true;

      this.mostrarRespuesta($event.target);
    }
    
  }

  private mostrarRespuesta(target:any):void{
    const nodoPadre = this.renderer2.parentNode(target);

      //Esta bien utilizar childNodes? (no encuentro en angular como acceder a los nodos hijos), unica forma de iterarlos con for o while?
      for(let i = 0; i < 4; i++)
      {
        if(nodoPadre.childNodes[i].value == this.pregunta?.respuesta)
        {
          setTimeout(() => {
            this.renderer2.setStyle(nodoPadre.childNodes[i], 'backgroundColor', '#ABEBC6');
          });
          break;
        }
      }

  }

  cerrarModal():void{
    this.dialogRef?.nativeElement.close();
    this.mostrarResultado = false;
    this.respuestaCorrecta = false;
    this.respuestaIncorrecta = false;
    this.cerrarModalPadre.emit(this.resultado);
  }
}
