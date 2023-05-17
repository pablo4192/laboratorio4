import { Component, OnInit, ViewChild, Renderer2, ElementRef} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent {

  @ViewChild('divCartasRef') divCartasRef:ElementRef|undefined;

  puntaje:number = 0;
  numeroAnterior: number = 0;
  paloAnterior:string = "";


  flagVictoria = false;
  flagDerrota = false;
  flagFinJuego = false;

  arrayPalos:string[] = [
    "oro", "espada", "basto", "copa"
  ];

  arrayNumeros:string[] = [
    "1", "2", "3", "4", "5", "6", "7", "10", "11", "12"
  ];

  cartas:string[] = [];

  constructor(private loginService:LoginService,
              private renderer2:Renderer2) {

   }

  ngOnInit(): void {
      
  }

  ngAfterViewInit(){
    this.darCarta("");
  }

  darCarta(seleccionUsr:string){

    if(!this.flagDerrota) //Todo esto pasa mientras el jugador este jugando, si perdio tiene que reiniciar
    {
      let ruta:string;
      let numero:number;
      let palo:string;

      if(this.cartas.length < 40)
      {
        do{
          let iPalo = this.numeroRandom(0,3);
          let iNumero = this.numeroRandom(0,9);
    
          palo = this.arrayPalos[iPalo];
          numero = parseInt(this.arrayNumeros[iNumero]);

          ruta = "./../../../../assets/img_mayor-menor/" + palo + "/" + numero + ".png";
          
        }while(this.cartas.includes(ruta));

        //Me fijo si el usuario acerto
        this.verificarCarta(seleccionUsr, numero);
        
        //Piso el numero anterior con el nuevo para proxima comparacion
        this.numeroAnterior = numero;

        //Agrego la carta al array a mostrar
        this.cartas.push(ruta);
      }

      setTimeout(() => {
        if(this.divCartasRef != null)
        {
          this.renderer2.setProperty(this.divCartasRef.nativeElement, 'scrollTop', this.divCartasRef.nativeElement.scrollHeight);
        }
      },);
    }
  }

  private verificarCarta(seleccionUsr:string , numero:number){
    
    switch(seleccionUsr)
    {
      case "Mayor":
        if(numero > this.numeroAnterior)
        {
          this.puntaje++;
          
          if(this.cartas.length == 40)
          {
            this.avisarVictoria();
          }
        }
        else if(numero < this.numeroAnterior)
        {
          this.avisarDerrota();
        }
        break;
        case "Menor":
          if(numero < this.numeroAnterior)
          {
            this.puntaje++;

            if(this.cartas.length == 40)
            {
              this.avisarVictoria();
            }
          }
          else if(numero > this.numeroAnterior)
          {
            this.avisarDerrota();
          }
          break;
          default:
            break;
    }
  }

  avisarDerrota(){
    this.flagDerrota = true;

    //Modificar por modal, hacer logica
    this.reiniciar();
  }

  avisarVictoria(){
   
    if(this.loginService.usuario != null && !this.flagDerrota && !this.flagFinJuego)
    {
      this.puntaje += 50;
      this.flagVictoria = true;
    }

    //Modificar por modal, hacer logica
    this.reiniciar();
  }

  reiniciar(){
    this.cartas.splice(0);
    this.numeroAnterior = 0;
    this.paloAnterior = "";
    this.flagVictoria = false;
    this.flagDerrota = false;
    this.flagFinJuego = false;
    this.puntaje = 0;    
  }

  retirarse(){ 

    //Modificar por modal, hacer logica
    this.reiniciar();
    this.darCarta("");


    // if(this.loginService.usuario != null && !this.flagDerrota && !this.flagFinJuego) 
    // {
    //   this.flagFinJuego = true; 
    // }
  }

  numeroRandom(min:number, max:number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

}
