import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss']
})
export class TecladoComponent {

  @Output() valorBoton = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  } 

  emitirValorBoton($event:any){
    this.valorBoton.emit($event.target.value); 
  }
}
