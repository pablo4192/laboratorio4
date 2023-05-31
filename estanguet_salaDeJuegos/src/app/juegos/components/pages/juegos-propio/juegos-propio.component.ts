import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos-propio',
  templateUrl: './juegos-propio.component.html',
  styleUrls: ['./juegos-propio.component.scss']
})
export class JuegosPropioComponent {

  @ViewChild('divContainer') containerRef:ElementRef|undefined;

  flagModalReinicio:boolean = false;
  start:boolean = false;
  lanzamientos:number = 80;
  meteoritosALanzar:number = this.lanzamientos;
  meteoritos:HTMLDivElement[] = [];
  meteoritosEliminados:number = 0;
  puntaje:number = 0;
  contadorMeteoritos:number = 0;
  meteoritosGrandes:HTMLDivElement[] = [];
  ovni:HTMLDivElement|undefined;
  destruccionMasiva:boolean = false;
  timerDestruccionMasiva:number = 10;
  energiaMeteoritoGigante:number = 21;
  mostrarEnergiaGigante:boolean = false;
  flagDerrota = false;
  idIntervalGeneradorMeteoritos:any;
  musica:HTMLAudioElement|undefined;

  constructor(private renderer2:Renderer2,
              private router:Router) { }

  ngOnInit(): void {
    this.renderer2.selectRootElement(window).scroll({
      top: 0
    });
  }

  ngOnDestroy():void{
    this.stopMusic();
  }

  private stopMusic():void{
    this.renderer2.selectRootElement(this.musica).pause();
    this.renderer2.selectRootElement(this.musica).currentTime = 0;
  }

  manejarEventoReiniciar():void{
    this.reiniciar();
  }

  reiniciar():void{
    clearInterval(this.idIntervalGeneradorMeteoritos);
    this.removerMeteoritos();
    this.removerOvni();
    this.reiniciarVariables();
    this.stopMusic();
    this.comenzarJuego();
  }

  private reiniciarVariables():void{
    this.meteoritosALanzar = this.lanzamientos;
    this.meteoritosEliminados = 0;
    this.puntaje = 0;
    this.contadorMeteoritos = 0;
    this.start = false;
    this.flagModalReinicio = false;
    this.destruccionMasiva = false; 
    this.timerDestruccionMasiva = 10;
    this.flagDerrota = false;
    this.energiaMeteoritoGigante = 21;
    this.mostrarEnergiaGigante = false;
  }

  private removerOvni():void{
    if(this.ovni != undefined)
    {
      this.renderer2.removeChild(this.containerRef?.nativeElement, this.ovni);
      this.ovni = undefined;
    }
  }

  private removerMeteoritos():void{
    if(this.meteoritos.length > 0)
    {
      this.meteoritos.forEach((m) => {
        this.renderer2.removeChild(this.containerRef?.nativeElement, m);
      });
  
      this.meteoritos.splice(0, this.meteoritos.length);
      this.meteoritosGrandes.splice(0, this.meteoritosGrandes.length);
    }
  }

  salir():void{
    this.router.navigate(['/juegos']);
  }

  comenzarJuego():void{

    if(!this.start)
    {
      this.start = true; 

      this.musica = this.crearAudio('assets/sounds/juegos-propio.mp3');
      this.renderer2.selectRootElement(this.musica).play();
      this.renderer2.selectRootElement(this.musica).volume = .5;
      
      this.renderer2.selectRootElement(window).scroll({
        top: 1000,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        this.idIntervalGeneradorMeteoritos = setInterval(()=>{
          
            this.generarMeteoritos();
            this.meteoritosALanzar--;

            if(this.contadorMeteoritos == this.meteoritosALanzar)
            this.generarOvni();
          
            if(this.meteoritosALanzar == 0)
            {
              clearInterval(this.idIntervalGeneradorMeteoritos);
              this.generarMeteoritoGigante();
            }
        
        },500);
      }, 2000);
    }
  }

  private crearAudio(src:string):HTMLAudioElement{
    let audio = this.renderer2.createElement('audio');
    this.renderer2.setAttribute(audio, 'src', src);
    return audio;
  }

  generarMeteoritos():void{
    
    let meteorito = this.renderer2.createElement('div');
    this.renderer2.addClass(meteorito, 'img-fluid');
    this.renderer2.addClass(meteorito, 'divMeteorito');

    let img = this.renderer2.createElement('img');
    this.renderer2.setAttribute(img, 'src', 'assets/img_juegoPropio/meteorito.png');
    this.renderer2.setAttribute(img, 'alt', 'meteorito.png');
    
    let audio = this.crearAudio('assets/img_juegoPropio/explosionChica.mp3');
    
    this.renderer2.appendChild(img, audio);
    this.renderer2.appendChild(meteorito, img);

    if(this.contadorMeteoritos == 10 || this.contadorMeteoritos == 20 || this.contadorMeteoritos == 30 || this.contadorMeteoritos == 40)
    {
      this.renderer2.addClass(img, 'meteoritoGrande');
    }
    else
    {
      this.renderer2.addClass(img, 'meteorito');
    }
    
    this.seleccionarDireccionCaida(meteorito);

    this.meteoritos.push(meteorito);
      
    this.renderer2.appendChild(this.containerRef?.nativeElement, meteorito);
    
    if(this.destruccionMasiva)
    {
      this.renderer2.listen(meteorito, 'mouseover', (e) => this.destruirMeteorito(e));
    }
    else
    {
      this.renderer2.listen(meteorito, 'mousedown', (e) => this.destruirMeteorito(e));
    }

    this.contadorMeteoritos++;
    
    }

  generarOvni():void{

    this.ovni = this.renderer2.createElement('div');
    this.renderer2.addClass(this.ovni, 'img-fluid');
    this.renderer2.setAttribute(this.ovni, 'class', 'ovni');

    let img = this.renderer2.createElement('img');
    this.renderer2.setAttribute(img, 'src', 'assets/img_juegoPropio/react.png');
    this.renderer2.setAttribute(img, 'alt', 'react.png');

    this.renderer2.appendChild(this.ovni, img);
    this.renderer2.appendChild(this.containerRef?.nativeElement, this.ovni);

    this.renderer2.listen(this.ovni, 'mousedown', (e) => this.comenzarDestruccionMasiva(e));
  }

  generarMeteoritoGigante():void{
    let gigante = this.renderer2.createElement('div');
    this.renderer2.addClass(gigante, 'img-fluid');
    this.renderer2.addClass(gigante, 'divGigante'); 

    let img = this.renderer2.createElement('img');
    this.renderer2.addClass(img, 'meteoritoGigante');
    this.renderer2.setAttribute(img, 'src', 'assets/img_juegoPropio/meteorito.png');
    this.renderer2.setAttribute(img, 'alt', 'meteorito.png');

    let audio = this.crearAudio('assets/img_juegoPropio/explosionGrande.mp3');
    this.renderer2.appendChild(img, audio);

    this.seleccionarTrayectoriaGigante(gigante);

    this.renderer2.appendChild(gigante, img);

    let divs:HTMLDivElement[] = [];
  
    let arrayPosicionY:string[] = [
      '10%', '45%', '45%', '45%', '85%'
    ];

    let arrayPosicionX:string[] = [
      '47%', '5%', '47%', '85%', '47%'
    ];

    divs = this.crearPuntosClave(arrayPosicionY, arrayPosicionX);

    for(let i = 0; i < divs.length; i++)
    {
      this.renderer2.appendChild(gigante, divs[i]);
    }
    
    this.renderer2.appendChild(this.containerRef?.nativeElement, gigante);
    
    this.gameOver(gigante);
    
  } 
  
  crearPuntosClave(posicionesY:string[], posicionesX:string[]):HTMLDivElement[]{
    let divs:HTMLDivElement[] = [];
    let div:HTMLDivElement;

    for(let i = 0; i < 5; i++)
    {
      div = this.renderer2.createElement('div');
      this.renderer2.setStyle(div, 'position', 'absolute');
      this.renderer2.setStyle(div, 'top', `${posicionesY[i]}`);
      this.renderer2.setStyle(div, 'left', `${posicionesX[i]}`);
      
      this.renderer2.listen(div, 'mousedown', (e) => this.destruirPuntosClaves(e));
      divs.push(div);
    }

    return divs;
  }

  comenzarDestruccionMasiva($event:any):void{

    this.renderer2.setStyle($event.target, 'background-color', '#ddd');

    this.destruccionMasiva = true;

    this.cambiarEventoMeteoritos();

    let id = setInterval(() => { 
      this.timerDestruccionMasiva--;
      
      if(this.timerDestruccionMasiva == 0)
      {
        clearInterval(id);
        this.destruccionMasiva = false;
      }
    }, 1000)
  }

  cambiarEventoMeteoritos():void{
    let hermano = this.renderer2.nextSibling(this.containerRef?.nativeElement.firstChild);

    do{
      this.renderer2.listen(hermano, 'mouseover', (e) => this.destruirMeteorito(e));
      hermano = this.renderer2.nextSibling(hermano); 

    }while (hermano != null);

  }

  //Direccionamiento de meteoritos
  seleccionarDireccionCaida(meteorito:HTMLDivElement):void{
    let random = this.numeroRandom(1,8);
    let clase = `t${random}`;
    this.renderer2.addClass(meteorito, clase);
  }

  seleccionarTrayectoriaGigante(meteoritoGigante:HTMLDivElement):void{
    let random = this.numeroRandom(1,3);
    let clase = `tg${random}`;
    this.renderer2.addClass(meteoritoGigante, clase);
  }
    
  destruirMeteorito($event:any):void{
    
    let i_destruido:number;

    if($event.target.className == 'meteorito')
    {
      this.renderer2.selectRootElement($event.target.firstChild).play();
      this.renderer2.setAttribute($event.target, 'src', 'assets/img_juegoPropio/explosion2.png')
      this.renderer2.addClass($event.target, 'exp');

      setTimeout(() => {
        
        this.renderer2.removeChild(this.containerRef?.nativeElement, $event.target.parentNode);
      }, 500);

      i_destruido = this.meteoritos.indexOf($event.target.parentNode);
      this.meteoritos.splice(i_destruido, 1);

      this.meteoritosEliminados++;
    }
    else if($event.target.className == 'meteoritoGrande')
    {
      if(this.meteoritosGrandes.includes($event.target.parentNode))
      {
        this.renderer2.selectRootElement($event.target.firstChild).play();
        this.renderer2.removeStyle($event.target, 'background-color');
        this.renderer2.setAttribute($event.target, 'src', 'assets/img_juegoPropio/explosion2.png')
        this.renderer2.addClass($event.target, 'exp');

        setTimeout(() => {
          this.renderer2.removeChild(this.containerRef?.nativeElement, $event.target.parentNode);
        }, 500);
          
        let i = this.meteoritosGrandes.indexOf($event.target.parentNode);

        this.meteoritosGrandes.splice(i, 1);
        
        i_destruido = this.meteoritos.indexOf($event.target.parentNode);
        this.meteoritos.splice(i_destruido, 1);

        this.meteoritosEliminados++;
      }
      else
      {
        this.renderer2.setStyle($event.target, 'background-color', 'red');
        this.meteoritosGrandes.push($event.target.parentNode);
      }
    }
      
  }

  destruirPuntosClaves($event:any):void{
    
    let padre = $event.target.parentNode;
  
    this.renderer2.removeChild(padre, $event.target);

    if(this.renderer2.nextSibling(padre.firstChild) == null)
    {
      this.mostrarEnergiaGigante = true;
      this.renderer2.listen(padre, 'mousedown', () => this.destruirMeteoritoGigante(padre));
    }
  }

  destruirMeteoritoGigante(meteoritoGigante:HTMLDivElement):void{
    let img = meteoritoGigante.firstChild;
      
    if(this.energiaMeteoritoGigante == 0){
      this.renderer2.selectRootElement(img?.firstChild).play();
      this.renderer2.setAttribute(img, 'src', 'assets/img_juegoPropio/explosion2.png')
      this.renderer2.addClass(img, 'exp');
      
      this.renderer2.selectRootElement(this.musica).volume = .2;

      setTimeout(() => {
        this.renderer2.removeChild(meteoritoGigante.parentNode, meteoritoGigante);
        
      }, 1000);
    }
    else{
      this.renderer2.setStyle(meteoritoGigante, 'background-color', 'red'); 

      setTimeout(() => {
        this.renderer2.setStyle(meteoritoGigante, 'background-color', 'transparent');
      }, 50);

      this.energiaMeteoritoGigante--;
    }
  }

  gameOver(meteoritoGigante:HTMLDivElement):void{

    setTimeout(() => {
      if(this.energiaMeteoritoGigante > 0)
      {
          this.stopMusic();
          this.flagDerrota = true;
          this.renderer2.removeChild(meteoritoGigante.parentNode, meteoritoGigante);
      }
      else
      {
        setTimeout(() => {
          this.flagModalReinicio = true;
        }, 1000);
          
      }

    }, 12000);

  }

  numeroRandom(min:number, max:number):number {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

}
