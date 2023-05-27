import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, setDoc, doc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../entidades/chat';
import { Palabra } from '../entidades/palabra';
import { Usuario } from '../entidades/usuario';
import { Pregunta } from '../entidades/pregunta';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) {
    
  }

  //Chat
  agregarMsj(chat:Chat){    
    const usrRef = collection(this.firestore, 'chat');
    addDoc(usrRef, {})
    .then((refDoc) => {
      setDoc(refDoc, {
        id: refDoc.id,
        texto: chat.texto,
        fecha: chat.fecha,
        mailUsr: chat.mailUsr
      })
    });
  }

  getMsjs(): Observable<Chat[]>{
    const usrRef = collection(this.firestore, 'chat');
    return collectionData(usrRef,{idField: 'id'}) as Observable<Chat[]>;
  }

  //Ahorcado
  updateScoreUsr(usuario:Usuario):Promise<any>{ 
    const usrRef = doc(this.firestore, `usuarios/${usuario.id}`);
    return updateDoc(usrRef, {puntaje_acumulado: usuario.puntaje_acumulado});
  }

  addPalabra(palabra:Palabra){  
    const usrRef = collection(this.firestore, 'palabras');
    return addDoc(usrRef, {
      nombre: palabra.nombre,
      pistas: palabra.pistas
    });
  }

  getPalabras(): Observable<Palabra[]>{
    const pRef = collection(this.firestore, 'palabras');
    return collectionData(pRef,{idField: 'id'}) as Observable<Palabra[]>;
  }

  //Preguntados
  addPregunta(pregunta:Pregunta){
    const pregRef = collection(this.firestore, 'preguntas');
    addDoc(pregRef, {})
    .then((refDoc) => {
      setDoc(refDoc, {
        id: refDoc.id,
        categoria: pregunta.categoria,
        texto: pregunta.texto,
        opciones: pregunta.opciones,
        respuesta: pregunta.respuesta
      });
    });
  }

  getPreguntas():Observable<Pregunta[]>{
    const pregRef = collection(this.firestore, 'preguntas');
    return collectionData(pregRef, {idField: 'id'}) as Observable<Pregunta[]>;
  }

}
