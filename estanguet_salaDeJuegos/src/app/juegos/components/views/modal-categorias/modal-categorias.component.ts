import { Component, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-categorias',
  templateUrl: './modal-categorias.component.html',
  styleUrls: ['./modal-categorias.component.scss']
})
export class ModalCategoriasComponent {

  @ViewChild('dialogRef') dialogRef:ElementRef|undefined;
  @Output() categoriaSeleccionada = new EventEmitter();

  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    //this.renderer2.selectRootElement(this.dialogRef?.nativeElement).showModal(); //Por que lo abre sin contenido???
    this.dialogRef?.nativeElement.showModal();
}

  emitirCategoria($event:any){
    this.dialogRef?.nativeElement.close();
    this.categoriaSeleccionada.emit($event.target.value);
  }
}
