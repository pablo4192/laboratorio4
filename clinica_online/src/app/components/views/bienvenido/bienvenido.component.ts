import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent {
    flagRegistro:boolean = false;

    constructor(private fs:FirestoreService){

    }

    ngOnInit():void{
      this.fs.esPaciente = false;
    }

    abrirOpciones():void{
      this.flagRegistro = !this.flagRegistro;
    }

    esPaciente():void{
      this.fs.esPaciente = true;
    }
}
 