import { Component, ElementRef, Renderer2, ViewChild, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService, especialidad } from 'src/app/services/firestore.service';



@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})
export class EspecialidadComponent implements OnChanges {
  @ViewChild('lista_especialidades') espRef:ElementRef|undefined;
  @Output() especialidad_seleccionada = new EventEmitter<string>();
  @Input() recargarEspecialidades:boolean = false;
  especialidades:especialidad[] = [];
  valor:string = '';


  constructor(private fs:FirestoreService, private r2:Renderer2){

  }

  ngOnInit():void{
    
  }

  ngOnChanges(changes:SimpleChanges):void{
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

  guardarValor($event:any):void{
    this.valor = $event.target.value;
    this.especialidad_seleccionada.emit(this.valor);
  }
}
