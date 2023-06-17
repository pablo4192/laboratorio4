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
      this.fs.registrarPaciente = false;
      this.fs.registrarProfesional = false;
    }

    abrirOpciones():void{
      this.flagRegistro = !this.flagRegistro;
    }

    esPaciente():void{
      this.fs.registrarPaciente = true;
    }

    esProfesional():void{
      this.fs.registrarProfesional = true;
    }
}
 