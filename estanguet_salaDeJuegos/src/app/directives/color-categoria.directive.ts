import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appColorCategoria]'
})
export class ColorCategoriaDirective {

  @Input() appColorCategoria:string|undefined;

  constructor(private renderer2:Renderer2,
              private element:ElementRef) {

}

ngAfterViewInit():void{ 
this.asignarColor();
}

asignarColor():void{

switch(this.appColorCategoria)
{
case 'Historia':
this.renderer2.setStyle(this.element.nativeElement, 'backgroundColor', '#ffdf00');
break;
case 'Arte':
  this.renderer2.setStyle(this.element.nativeElement, 'backgroundColor', 'red');
  break;
  case 'Deportes':
    this.renderer2.setStyle(this.element.nativeElement, 'backgroundColor', '#ff9900');
    break;
    case 'Cine':
      this.renderer2.setStyle(this.element.nativeElement, 'backgroundColor', 'violet');
      break;
      case 'Ciencia':
        this.renderer2.setStyle(this.element.nativeElement, 'backgroundColor', 'green');
        break;
        case 'Geografia':
          this.renderer2.setStyle(this.element.nativeElement, 'backgroundColor', 'blue');
          break;
          default:
            this.renderer2.setStyle(this.element.nativeElement, 'backgroundColor', 'black');
            break;

}

}

}
