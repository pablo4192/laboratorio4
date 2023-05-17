import { Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { Chat } from 'src/app/entidades/chat';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  chats:Chat[];
  textoMsj:string = '';
  anio:string = '';
  mes:string = ''; 
  dia:string = '';

  @ViewChild('chat') chatRef:ElementRef|undefined;
 
  
  constructor(private fs:FirestoreService, 
              private ls:LoginService, 
              private r2:Renderer2) 
  { 
    this.chats = [];
  }

  ngOnInit(): void {
    this.ObtenerMensajes();
  }

  ngAfterViewInit():void{
    this.r2.selectRootElement(window).scroll(
      {
        top:1000, behavior:'smooth'
      });

    setTimeout(() => {
      this.r2.setProperty(this.chatRef?.nativeElement, 'scrollTop', this.chatRef?.nativeElement.scrollHeight);
    }, 200);
  }

  public EnviarMsj(){
    let fecha = Date.now();
    let chat = new Chat(this.textoMsj, fecha, this.ls.usuario?.mail);
    this.fs.agregarMsj(chat);
    this.textoMsj = '';
  }

  public ObtenerMensajes(){
    this.fs.getMsjs().subscribe((data) => {
      this.chats = data;
      
      this.chats.forEach((c) => {
        if(c.mailUsr == this.ls.usuario?.mail)
        {
          c.color = '#fff';  
        }
        else
        {
          c.color = '#ccc';
          c.left = '50%';    
        }
      });
      
      if(this.chats.length > 1) 
      {
        this.chats.sort((a,b) => this.ordenarMsjs(a,b));
      }

      if(this.chatRef?.nativeElement != null)
      {
        this.r2.setProperty(this.chatRef.nativeElement, 'scrollTop', this.chatRef.nativeElement.scrollHeight);
        
      }
    });
  }

  private ordenarMsjs(c1:Chat, c2:Chat):number{
    return c1.fecha - c2.fecha;
  }
   
}
