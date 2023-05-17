import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Firestore, collection, addDoc,collectionData, doc, deleteDoc, setDoc, updateDoc , getDoc, query, where, getDocs, QuerySnapshot, DocumentData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario:Usuario|undefined;
  
  constructor(private auth:Auth, private firestore:Firestore) {
    this.usuario = new Usuario();
  }
  
  Registro(usuario:Usuario):Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.auth, usuario.mail, usuario.contrasenia);
  }

  Login(usuario:Usuario){
    
    return signInWithEmailAndPassword(this.auth, usuario.mail, usuario.contrasenia);
  }

  logout(){
    return signOut(this.auth);
  }

  getUsuarioActivo(){
    return this.auth.currentUser;
  }

  getUsuarios(): Observable<Usuario[]>{
    const usrRef = collection(this.firestore, 'usuarios');
    return collectionData(usrRef,{idField: 'id'}) as Observable<Usuario[]>;
  }

  addUsuario(usuario:Usuario){  
    const usrRef = collection(this.firestore, 'usuarios');
    addDoc(usrRef, {}).then((refDoc) => {
        
      setDoc(refDoc, {
        id: refDoc.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        edad: usuario.edad, //Cambiar por fecha nacimiento y hacer calculo
        mail: usuario.mail,
        contrasenia: usuario.contrasenia,
        puntaje_acumulado: 0,
        ultima_conexion: this.retornarFechaLog()
      }).then(() => {
        getDoc(refDoc)
        .then((usr) => {
          //Guardo el usuario con todos sus campos para tenerlo visible en cualquier componente
          this.usuario = usr.data() as Usuario;
          
          this.guardarLogUsuario(usr.data() as Usuario); 
        })
        .catch((error) => console.log(error));
      });
    
    });

  }

  guardarLogUsuario(usuario:Usuario){  
    const logRef = collection(this.firestore, 'log_usuarios');
    return addDoc(logRef, {
      usuario: usuario.mail,
      fecha: usuario.ultima_conexion
    });
  }

   actualizarUltimaConexion(usuario:Usuario){
    this.getUsuarioPorMail(usuario.mail).then((docs) => {
        docs.forEach((d) => {
          this.usuario = d.data() as Usuario;

          //Guardo el usuario con todos sus campos para tenerlo visible en cualquier componente
          this.usuario.ultima_conexion = this.retornarFechaLog(); 
          
          const docRef = doc(this.firestore, 'usuarios', this.usuario.id);
          updateDoc(docRef, {
              ultima_conexion: this.usuario.ultima_conexion 
          })
          .then(() => {
            this.guardarLogUsuario(this.usuario as Usuario);
          })
          .catch((error) => console.log(error));

      });
    })
    .catch((error) => console.log(error));
    
  }

  private retornarFechaLog():string{
    let date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  getUsuarioPorMail(mail:string):Promise<QuerySnapshot<DocumentData>>{
    const collectionRef = collection(this.firestore, 'usuarios');
    let q = query(collectionRef, where('mail', '==', mail));

    return getDocs(q);
  }


}
