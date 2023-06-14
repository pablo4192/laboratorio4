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
      this.rt.navigate(['/login']);
    });
  }


}
