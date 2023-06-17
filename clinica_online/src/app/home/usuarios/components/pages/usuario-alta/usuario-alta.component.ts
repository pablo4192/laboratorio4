import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-usuario-alta',
  templateUrl: './usuario-alta.component.html',
  styleUrls: ['./usuario-alta.component.scss']
})
export class UsuarioAltaComponent {

  abrirRegistro:boolean = false;
  avisar_cambio_validaciones:boolean = false;

  constructor(private fs:FirestoreService){

  }

  altaPaciente(){
    this.fs.registrarPaciente = true;
    this.fs.registrarProfesional = false;
    this.fs.registrarAdmin = false; 

    this.abrirRegistro = true;
    this.avisar_cambio_validaciones = !this.avisar_cambio_validaciones;
  }

  altaProfesional(){
    this.fs.registrarProfesional = true;
    this.fs.registrarPaciente = false;
    this.fs.registrarAdmin = false;

    this.abrirRegistro = true;
    this.avisar_cambio_validaciones = !this.avisar_cambio_validaciones;

  }


  altaAdministrador(){
    this.fs.registrarAdmin = true;
    this.fs.registrarPaciente = false;
    this.fs.registrarProfesional = false;

    this.abrirRegistro = true;
    this.avisar_cambio_validaciones = !this.avisar_cambio_validaciones;

  }
}
