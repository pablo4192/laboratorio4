import { Component, OnInit } from '@angular/core';
import { Palabra } from 'src/app/entidades/palabra';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {

  puntajePorVictoria:number = 10;
  valorTecla:string = '';
  palabra:Palabra|any;
  incognita:string = '';
  rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado0.jpg";
  intentos = 6;
  timer:number = 60;
  idInterval:any;
  arrayPalabras:Palabra[] = [];
  pistas:string[] = [];
  partidaFinalizada:boolean = false;
  victoria:boolean = false;  
  
  constructor(private firestoreService:FirestoreService) {
    
  }

  ngOnInit(): void {
    this.firestoreService.getPalabras().subscribe(data => {
      this.arrayPalabras = data;
      this.escogerPalabra();
    }); 
  }

  ejecutarTimer(){
   
    this.idInterval = setInterval(() => {
    if(this.timer > 0)
    {
      this.timer--;
    }
    else
    {
      this.avisarDerrota();
      clearInterval(this.idInterval);
    }

   }, 1000);
   
  }

  escogerPalabra(){
    
    let i = this.numeroRandom(0, this.arrayPalabras.length - 1);
    this.palabra = this.arrayPalabras[i];

    for(let i = 0; i < this.palabra.nombre.length; i++)
    {
      this.incognita += '-';
    }

    this.ejecutarTimer();
  }

  numeroRandom(min:number, max:number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  controlarEventoTeclado($event:any){
    this.valorTecla = $event;

    if(!this.partidaFinalizada)
    this.verificarLetraIngresada();

  }

  private verificarLetraIngresada(){
    
    let flagLetraErronea = true;
    let arrayPalabra = this.palabra.nombre.split('');
    let arrayIncognita = this.incognita.split('');

    for(let i = 0; i < arrayPalabra.length; i++)
    {
      if(arrayPalabra[i] == this.valorTecla)
      {
        arrayIncognita[i] = this.valorTecla;
        flagLetraErronea = false;
      }
    }

    if(flagLetraErronea)
    {
      this.intentos --;
      this.dibujarAhorcado();
    }
    else
    {
      this.incognita = arrayIncognita.join('');
      
      if(this.incognita == this.palabra.nombre)
      {
        this.avisarVictoria();
      }
    }
  }

  private dibujarAhorcado(){
    switch(this.intentos)
    {
      case 5:
        this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado1.jpg";
        break;
        case 4:
          this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado2.jpg";
          break;
          case 3:
            this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado3.jpg";
            this.darPista(0);
            break;
            case 2:
              this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado4.jpg";
              break;
              case 1:
                this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado5.jpg";
                this.darPista(1);
                break;
                default:
                  this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado6.jpg";
                  this.avisarDerrota();

    }
  }

 private darPista(indexPista:number){
    this.pistas.push(this.palabra.pistas[indexPista]);

 }

  reiniciarJuego(){
    this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado0.jpg";
    this.incognita = '';
    this.pistas.splice(0);
    this.escogerPalabra();
    this.intentos = 6;
    this.partidaFinalizada = false;
    this.victoria = false;
    this.timer = 60;
  }

  
  avisarVictoria(){
    clearInterval(this.idInterval);
    this.partidaFinalizada = true;
    this.victoria = true;
  }

  avisarDerrota(){
    clearInterval(this.idInterval);
    this.partidaFinalizada = true;
  }
}
