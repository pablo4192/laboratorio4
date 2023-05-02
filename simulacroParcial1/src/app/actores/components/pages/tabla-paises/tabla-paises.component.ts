import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.css']
})
export class TablaPaisesComponent {

  paises:any[] = [];
  @Output() paisSeleccionado = new EventEmitter<string>();
  suscripcion:Subscription|undefined;
  continente:string = 'all';

  constructor(private httpService:HttpService){

  }

  ngOnInit():void{
    this.getPaises(this.continente);
  }

  getPaises(continente:string):void{
    this.suscripcion = this.httpService.getPaises(continente).subscribe((p) => {
      this.paises = p;
      this.suscripcion?.unsubscribe();
    });
  }

  emitirPaisSeleccionado(pais:any):void{
    this.paisSeleccionado.emit(pais.name['common']);
  }

  filtrarPaises():void{
    this.getPaises(this.continente);
  }

}
