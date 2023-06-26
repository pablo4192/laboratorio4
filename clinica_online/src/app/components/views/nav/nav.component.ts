import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(public fs:FirestoreService,
              private rt:Router){

  }

  logout():void{
    this.fs.logout()
    .then(() => {
      
      //Para ocultar nav cuando se realiza logout
      this.fs.usr_en_sesion = undefined;


      this.rt.navigate(['/login']);
    });
  }

}
