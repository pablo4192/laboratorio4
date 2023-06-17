import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public fs:FirestoreService,
              private rt:Router){

  }

  ngOnInit():void{

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
