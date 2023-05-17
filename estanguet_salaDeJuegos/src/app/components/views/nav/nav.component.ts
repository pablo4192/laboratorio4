import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private ls:LoginService){

  }

  getLogueado():boolean{
    if(this.ls.getUsuarioActivo()){
      return true;
    }

    return false;
  }
}
