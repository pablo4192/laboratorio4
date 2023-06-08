import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOpenModal]'
})
export class OpenModalDirective {

  modal:HTMLDialogElement;

  constructor(private el:ElementRef) {
    this.modal = this.el.nativeElement;
    this.abrirModal();  
  }
   
  private abrirModal(){
    setTimeout(() => {
      this.modal.showModal();
    }, 100);
  }
      
   

}
