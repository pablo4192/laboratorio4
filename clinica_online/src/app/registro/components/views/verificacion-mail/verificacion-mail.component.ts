import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-verificacion-mail',
  templateUrl: './verificacion-mail.component.html',
  styleUrls: ['./verificacion-mail.component.scss']
})
export class VerificacionMailComponent {

  @Input() mailUsr:string = '';
  
  constructor(private fs:FirestoreService,
              private rt:Router){

  }
}
