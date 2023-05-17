import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(public ls:LoginService,
              private router:Router){

  }

  logout():void{
    this.ls.logout()
    .then(() => {
      this.ls.usuario = undefined;
      this.router.navigate(['./']);
    });
  }
}
