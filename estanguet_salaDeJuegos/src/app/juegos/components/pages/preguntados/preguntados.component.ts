import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Pregunta } from 'src/app/entidades/pregunta';
import { HttpService } from 'src/app/services/http.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {

  @ViewChild('ruleta') ruletaRef:ElementRef|undefined;
  @ViewChild('divProgreso') divProgresoRef:ElementRef|undefined;

  detenerMano:boolean = false;
  abrirModal:boolean = false;
  abrirModalCategoria:boolean = false;
  abrirModalFinDeJuego:boolean = false;
  victoria:boolean = false;
 
  categoriaPregunta:string = '';
  pexelsCat:string = '';
  urlImagen:string = '';
  claseRuleta:string = '';

  preguntas:Pregunta[] = [];
  preguntasAux:Pregunta[] = [];
  preguntaSeleccionada:Pregunta|undefined;

  ruletaGirando:boolean = false;
  divsBarraProgreso:HTMLDivElement[] = [];
  intentos:number = 3;
  puntajePorVictoria:number = 0;
  
  /*Preguntas

    //Historia
    new Pregunta('historia', '¿El periodo en el que aparecieron la agricultura y los asentamientos sedentarios se llama?', 
    ['Neolítico', 'Edad Media', 'Paleolítico', 'Actualidad'], 'Neolítico'),
    new Pregunta('historia', ' ¿Cuándo se inventó la escritura?', 
    ['Hace 20 mil años', 'En el IV milenio a.C', 'En el año 0', 'En el año 1522'], 'En IV milenio a. C'),
    new Pregunta('historia', '¿Cómo se llamaban los gobernantes del antiguo Egipto?', 
    ['Faraones', 'Jefes', 'Basileos','Alcaldes'], 'Faraones'),
    new Pregunta('historia', ' Según las leyendas de la antiguedad, ¿quiénes fundaron a Roma?', 
    ['Pablo y Pachu', 'Aquiles y Odiseo', 'Alejandro Magno y Ptolomeo', 'Rómulo y Remo'], 'Rómulo y Remo'),
    new Pregunta('historia', '¿Contra quiénes se enfrentaron los griegos en las Guerras Médicas del siglo V a.C.?',
    ['Celtas', 'Mongoles', 'Persas', 'Hebreos'], 'Persas'),
    //Deportes
    new Pregunta('deportes', '¿Cuantos mundiales de futbol tiene ganados la selección Argentina de futbol masculina?',
    ['1', '2', '3', 'ninguno'], '3'),
    new Pregunta('deportes', '¿En qué país se inventó el voleibol?',
    ['Dinamarca', 'EE.UU', 'Inglaterra', 'Francia'], 'EE.UU'),
    new Pregunta('deportes', '¿En qué país se encuentra el circuito de Le Mans?',
    ['Francia', 'Nueva Zelanda', 'Alemania', 'Australia'], 'Francia'),
    new Pregunta('deportes', '¿Cómo se llama la zona de hierba sobre la cual se ubica el hoyo en golf?',
    ['Cesped', 'Zona de hoyo', 'Green', 'Blue'], 'Green'),
    new Pregunta('deportes', '¿Cómo se llama el deporte en el cual se levantan pesas?',
    ['Halterofilia', 'Hipertrofia', 'Chimultrufia', 'Musculación'], 'Halterofilia'),
    //Arte
    new Pregunta('arte', '¿Quién pintó "La Gioconda"?', 
    ['Miguel Angel', 'Leonardo da Vinci', 'Bethoven', 'Pablo Picasso'], 'Leonardo da Vinci'),
    new Pregunta('arte', '¿Cómo se llama este pintor que se cortó la oreja?', 
    ['Vincent van Gogh', 'Salvador Dalí', 'Federico Klem', 'Hevander Holifield'], 'Vincent van Gogh'),
    new Pregunta('arte', '¿Quién de ellos NO fue un muralista mexicano?', 
    ['Pedro Lira', 'Diego Rivera', 'David Alfaro Siqueiros', 'José Clemente Orozco'], 'Pedro Lira'),
    new Pregunta('arte', 'La obra llamada "Guernica" es de...',
    ['Henri Matisse', 'Marta Minujin', 'Juan Minujin', 'Pablo Picasso'], 'Pablo Picasso'),
    new Pregunta('arte', '¿Quién pintó esto la Capilla Sixtina de El Vaticano?', 
    ['Francisco de Goya', 'Miguel Ángel', 'Cravaggio', 'Claude Monet'], 'Miguel Ángel'),
    //Geografia
    new Pregunta('geografia', '¿Cuál es el río más largo de la Península Ibérica?',
    ['Negro', 'El Tajo', 'Nilo', 'Ferdinand'], 'El Tajo'),
    new Pregunta('geografia', '¿Cuál es el país más pequeño del mundo?',
    ['Vaticano', 'Papua y nueva Guinea', 'Serbia y Montenegro', 'Islandia'], 'Vaticano'),
    new Pregunta('geografia', '¿Qué país tiene más habitantes?',
    ['Rusia', 'EE.UU', 'China', 'Brasil'], 'China'),
    new Pregunta('geografia', '¿Cuántos océanos hay en la Tierra?', 
    ['6', '4', '5', '7'], '5'),
    new Pregunta('geografia', '¿Qué país es el más grande del mundo?',
    ['Rusia', 'EE.UU', 'China', 'Brasil'], 'Rusia'),
    //Cine
    new Pregunta('cine', '¿Quién dirigió la película Origen en el 2010?',
    ['Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Pepe Cibrian'], 'Christopher Nolan'),
    new Pregunta('cine',' ¿Cuántas películas conforman la saga cinematográfica Harry Potter?',
    ['2', '5', '4', '8'], '8'),
    new Pregunta('cine', '¿Quién dirigió la película Parque Jurásico en el año 1993?',
    ['Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Martin Scorcese'], 'Steven Spielberg'),
    new Pregunta('cine', '¿Qué actor interpretó a Aquiles en la película Troya del 2004?',
    ['Leonardo di Caprio', 'Ben Afleck', 'Brad Pitt', 'Sebastian Estevanez'], 'Brad Pitt'),
    new Pregunta('cine', '¿Quiénes interpretaron a Michael Corleone y Vito Corleone, respectivamente, en la película El Padrino?',
    ['Al Pacino y Robert De Niro', 'Robert De Niro y Andy Garcia', 'Al Pacino y Marlon Brando', 'Robert De niro y Joe Pesci'],
    'Al Pacino y Marlon Brando'),
    //Ciencia
    new Pregunta('ciencia', '¿Cuál es el gas más abundante en la atmósfera de la Tierra?',
    ['Oxigeno', 'Nitrogeno', 'Metano', 'Fosforo'], 'Oxigeno'),
    new Pregunta('ciencia', '¿Cuántas vertebras posee el cuerpo humano?', 
    ['33', '35', '38', '39'], '33'),
    new Pregunta('ciencia', '¿Cuál es el material natural más duro del planeta?',
    ['Titanio', 'Acero', 'Diamante', 'Oro'], 'Diamante'),
    new Pregunta('ciencia', '¿Cuál es el hueso más grande en el cuerpo humano?',
    ['Tibia', 'Perone', 'Rotula', 'Femur'], 'Femur'),
    new Pregunta('ciencia', '¿Quién escribió el libro “Breve historia del tiempo”?', 
    ['Elon Musk', 'Neil deGrasse Tyson', 'Carl Sagan', 'Stephen Hawking'], 'Stephen Hawking')
  */

  constructor(private r2:Renderer2,
              private http:HttpService,
              private fs:FirestoreService) { }

  ngOnInit(): void {
    this.obtenerPreguntas(); 
  }

  private obtenerPreguntas():void{
    this.fs.getPreguntas().subscribe(p => this.preguntas = p);
  }

  girarRuleta():void{

    if(!this.ruletaGirando)
    {
      this.detenerMano = true;
      let numeroRandom = this.numeroRandom(1,7);    

      if(this.ruletaRef != null)
      {
        this.r2.setAttribute(this.ruletaRef.nativeElement, 'class', 'girar');
        this.ruletaGirando = true;

        setTimeout(() => {
          this.seleccionarCategoria(numeroRandom); 
          this.ruletaGirando = false;
          this.r2.removeClass(this.ruletaRef?.nativeElement, 'girar');
        }, 2000);

      }
    }
  }

  seleccionarCategoria(numeroCategoria:number):void{
    
    if(this.claseRuleta != '')
      this.r2.removeClass(this.ruletaRef?.nativeElement, this.claseRuleta);
    
    switch(numeroCategoria)
    {
      case 1:
        this.r2.addClass(this.ruletaRef?.nativeElement, 'historia');
        this.categoriaPregunta = 'Historia';
        this.claseRuleta = 'historia';
        this.pexelsCat = 'history';
        break;
        case 2:
          this.r2.addClass(this.ruletaRef?.nativeElement, 'deportes');
          this.categoriaPregunta = 'Deportes';
          this.claseRuleta = 'deportes';
          this.pexelsCat = 'sports';
          break;
          case 3:
            this.r2.addClass(this.ruletaRef?.nativeElement, 'arte');
            this.categoriaPregunta = 'Arte';
            this.claseRuleta = 'arte';
            this.pexelsCat = 'art';
            break;
            case 4:
              this.r2.addClass(this.ruletaRef?.nativeElement, 'cine');
              this.categoriaPregunta = 'Cine';
              this.claseRuleta = 'cine';
              this.pexelsCat = 'movies';
              break;
              case 5:
                this.r2.addClass(this.ruletaRef?.nativeElement, 'eleccionUsr');
                this.categoriaPregunta = 'Selección libre';
                this.claseRuleta = 'eleccionUsr';
                break;
                case 6:
                  this.r2.addClass(this.ruletaRef?.nativeElement, 'geografia');
                  this.categoriaPregunta = 'Geografia';
                  this.claseRuleta = 'geografia';
                  this.pexelsCat = 'geography';
                  break;
                  case 7:
                    this.r2.addClass(this.ruletaRef?.nativeElement, 'ciencia');
                    this.categoriaPregunta = 'Ciencia';
                    this.claseRuleta = 'ciencia';
                    this.pexelsCat = 'science';
                    break;
    }

    if(this.seleccionarPregunta(this.categoriaPregunta.toLowerCase()))
    {
      this.getImgApi();
      this.abrirModal = true;
    }    
    
  }

  private getImgApi():void{

    let i_random = this.numeroRandom(1,10);

    this.http.getImage(`https://api.pexels.com/v1/search?query=${this.pexelsCat}`).subscribe(data => {this.urlImagen = data.photos[i_random].src.medium});
  } 

  private seleccionarPregunta(categoria:string):boolean{

    let arrayCategoria:Pregunta[] = [];
    let i_random:number;
    let indiceAEliminar:number;

    if(categoria == 'selección libre') 
    {
      this.abrirModalCategoria = true;
      return false;
    }
    
    this.abrirModalCategoria = false;

    arrayCategoria = this.preguntas.filter((p) => p.categoria == categoria);
    i_random = this.numeroRandom(0, arrayCategoria.length -1);
    this.preguntaSeleccionada = arrayCategoria[i_random];

    //Busco la pregunta seleccionada para eliminarla del array de preguntas y evitar que reaparezca, actualizando se reestablecen todas las preguntas
    indiceAEliminar = this.preguntas.indexOf(this.preguntaSeleccionada);
    this.preguntas.splice(indiceAEliminar, 1);
    
    return true;
  }

  manejarEventoCategoria($event:any){
    switch($event)
    {
      case 'Historia':
          this.seleccionarCategoria(1);
          break;
          case 'Arte':
          this.seleccionarCategoria(3);
            break;
            case 'Deportes':
            this.seleccionarCategoria(2);
              break;
              case 'Cine':
              this.seleccionarCategoria(4);
                break;
                case 'Ciencia':
                this.seleccionarCategoria(7);
                break;
                  case 'Geografia':
                  this.seleccionarCategoria(6);
                  break;
    }
  }

  manejarEventoModal($event:string){
    this.abrirModal = false;

    if($event == 'Respuesta correcta')
    {
      this.crearBarraProgreso();

      if(this.divsBarraProgreso.length == 10)
      this.avisarVictoria();
    }
    else
    {
      this.intentos--;

      if(this.intentos == 0)
      this.abrirModalFinDeJuego = true; //Caso Derrota 
    }
  }

  crearBarraProgreso():void{
      let divCreado = this.r2.createElement('div');

      this.divsBarraProgreso.push(divCreado);
      
      this.r2.setAttribute(divCreado, 'class', 'barraProgreso');
      this.r2.appendChild(this.divProgresoRef?.nativeElement, divCreado);
  }

  eventoReiniciarModal():void{
    this.reiniciar();
  }

  reiniciar():void{
    this.eliminarBarraProgreso();
    this.abrirModalFinDeJuego = false;
    this.intentos = 3;
    this.puntajePorVictoria = 0;
  }

  private eliminarBarraProgreso():void{
    this.divsBarraProgreso.forEach((e) => this.r2.removeChild(this.divProgresoRef?.nativeElement, e));
    this.divsBarraProgreso.splice(0);
  }

  avisarVictoria():void{
    this.abrirModalFinDeJuego = true;
    this.victoria = true;
    this.puntajePorVictoria = 50;
  }
  
  numeroRandom(min:number, max:number):number {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }
}
