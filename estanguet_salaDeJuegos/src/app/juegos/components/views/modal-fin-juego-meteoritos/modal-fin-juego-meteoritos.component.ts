import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-modal-fin-juego-meteoritos',
  templateUrl: './modal-fin-juego-meteoritos.component.html',
  styleUrls: ['./modal-fin-juego-meteoritos.component.scss']
})
export class ModalFinJuegoMeteoritosComponent {

  @ViewChild('divDialog') dialogRef:ElementRef|undefined;
  @Input() meteoritosInterceptados:number = 0;
  @Output() reiniciarJuego = new EventEmitter<boolean>();
  
  puntaje:number = 0;
  titulo:string = '';

  flag:boolean = true;

  constructor(private renderer2:Renderer2,
              private loginService:LoginService,
              private firestoreService:FirestoreService,
              private router:Router) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit():void{
    //this.renderer2.selectRootElement(this.dialogRef?.nativeElement).showModal(); //Por que lo abre sin contenido???
    this.dialogRef?.nativeElement.showModal();
    this.generarTitulo();
    
  }

  ngOnChanges():void{
    this.generarTitulo();
    this.generarPuntaje();
  }

reiniciar():void{
  if(this.loginService.usuario != null)
    {
      this.loginService.usuario.puntaje_acumulado += this.puntaje;

      this.firestoreService.updateScoreUsr(this.loginService.usuario);
      
      this.dialogRef?.nativeElement.close();
      this.reiniciarJuego.emit(true);
    }
    else
    {
      console.log(`loginService.usuario: ${this.loginService.usuario}`);
    }

}

salir():void{
  if(this.loginService.usuario != null)
    {
      this.loginService.usuario.puntaje_acumulado += this.puntaje;

      this.firestoreService.updateScoreUsr(this.loginService.usuario);
      
      this.dialogRef?.nativeElement.close();
      this.router.navigate(['/juegos']);
    }
    else
    {
      console.log(`loginService.usuario: ${this.loginService.usuario}`);
    }
}

generarPuntaje():void{
  
  if(this.meteoritosInterceptados > 0)
  {
    setTimeout(() => {
      let id = setInterval(() => {
        this.puntaje += 5;
        this.meteoritosInterceptados--;
    
        if(this.meteoritosInterceptados == 0)
        {
          clearInterval(id);
          this.flag = false;
        }
    
      }, 100);
    }, 1000);
  }

}


generarTitulo():void{

    if(this.meteoritosInterceptados < 20)
    {
      this.titulo = 'Cuando te reclutamos para salvar al mundo hubiera sido bueno saber sobre tus problemas visuales. Demasiados meteoritos impactaron, se acabo todo todillo... ';
    }
    else if(this.meteoritosInterceptados < 40)
    {
      this.titulo = 'Ya no hay vuelta atras, el planeta entro en su sexta extinsión masiva. Demasiados meteoritos impactaron en la superficie';
    }
    else if(this.meteoritosInterceptados < 60)
    {
      this.titulo = 'Nos costara salir de esta catastrofe pero lograremos sobreponernos. Varias zonas se vieron afectadas por los impactos';
    }
    else{
      this.titulo = 'Este es un dia para festejar, has salvado al planeta tierra!! Hemos tomado conciencia de lo fragil que puede ser nuestro mundo, ahora lucharemos contra la crisis climatica.'
    }  
  
}
}
