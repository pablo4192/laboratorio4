import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-modal-fin-de-juego',
  templateUrl: './modal-fin-de-juego.component.html',
  styleUrls: ['./modal-fin-de-juego.component.scss']
})
export class ModalFinDeJuegoComponent {

  @Input() victoria:boolean = false;
  @Input() retirarse:boolean = false;
  @Input() puntos:number = 0;
  @Output() reiniciarJuego = new EventEmitter<boolean>();
  @ViewChild('dialogRef') dialogRef:ElementRef|undefined;

  constructor(private fs:FirestoreService,
              private ls:LoginService,
              private rt:Router){

  }

  ngAfterViewInit():void{
    this.dialogRef?.nativeElement.showModal();
  }

  salir():void{
    this.actualizarPuntaje();
    this.rt.navigate(['./home']);
  }

  reiniciar():void{
    this.actualizarPuntaje();
    this.reiniciarJuego.emit(true);
  }

  actualizarPuntaje():void{
    if(this.puntos != 0 && this.ls.usuario){
      this.ls.usuario.puntaje_acumulado += this.puntos;
      
      this.fs.updateScoreUsr(this.ls.usuario)
      .then((response) => {
        console.log(response + " Se actualizo el puntaje en DB"); //Ver, retorna undefined
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

}
