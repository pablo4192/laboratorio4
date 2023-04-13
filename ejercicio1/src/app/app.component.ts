import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejercicio1';

  edad1:string|undefined;
  edad2:string|undefined;
  promedio:number|undefined;
  suma:number|undefined;

  calcular():void{
      if(this.edad1 && this.edad2){
        this.suma = parseInt(this.edad1) + parseInt(this.edad2);
        this.promedio = this.suma / 2;
      }
  }


}


/*
1- (app.component.html) Realizar:
una aplicacion que se le ingresen dos edades en dos cuadro de textos
edadUno, EdadDos
mostrar el promedio y la suma en dos cuadros de textos nuevos
botones "calcular" y "limpiar cuadros de textos"
*/