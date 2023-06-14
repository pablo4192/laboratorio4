import { Injectable } from '@angular/core';
import { Firestore, addDoc, setDoc, collection, collectionData, query, getDocs, where } from '@angular/fire/firestore';
import { Usuario } from '../entidades/usuario';
import { Paciente } from '../entidades/paciente';
import { Profesional } from '../entidades/profesional';
import { Administrador } from '../entidades/administrador';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

export interface especialidad{
  id:string;
  nombre:string;
}

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  esPaciente:boolean = false; 
  imagenes:string[] = [];
  idUsr:string = ''; //Ver!

  constructor(private fire:Firestore,
              private auth:Auth,
              private st:Storage) { }


  //VERIFICAR MAIL
  /**
   * Registra al usuario con mail y contraseña utilizando Auth de firebase
   * @param usuario 
   * @returns 
   */
  registro(usuario:Usuario):Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.auth, usuario.mail, usuario.password);
  }

  /**
   * Loguea al usuario con mail y contraseña utilizando Auth de firebase
   * @param usuario 
   * @returns 
   */
  login(usuario:Usuario):Promise<UserCredential>{
    return signInWithEmailAndPassword(this.auth, usuario.mail, usuario.password);
  }

  /**
   * Finaliza sesión del usuario
   * @returns 
   */
  logout():Promise<void>{
    return signOut(this.auth);
  }

  /**
   * Direcciona al usuario al metodo correspondiente segun instancia para guardar sus datos en la base.
   * @param usuario Instancia de Usuario
   * @param imagenes array de files
   */
  addUsuario(usuario:Usuario, imagenes:any):void{
    if(usuario instanceof Paciente){
      this.addPaciente(usuario, imagenes);
    }
    else if(usuario instanceof Profesional){
      this.addProfesional(usuario, imagenes);
    }
    else{
      this.addAdministrador(usuario, imagenes);
    }
  }

  /**
   * Guarda datos del paciente en la base y sube las imagenes al storage asociadas al id del usuario registrado.
   * @param paciente instancia de entidad Paciente
   * @param imagenes array de files
   */
  private addPaciente(paciente:Paciente, imagenes:any){
    const usrRef = collection(this.fire, 'pacientes');
    
    addDoc(usrRef, {})
    .then((refDoc) => {
      this.idUsr = refDoc.id;

      setDoc(refDoc, {
        id: refDoc.id,
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        edad: paciente.edad,
        dni: paciente.dni,
        mail: paciente.mail,
        obra_social: paciente.obra_social,
        password: paciente.password,
      });

      for(let i = 0; i < imagenes.length; i++){
        this.uploadImg(refDoc.id, imagenes[i]);
      }

    });

  }

  /**
   * Guarda datos del profesional en la base y sube las imagenes al storage asociadas al id del usuario registrado.
   * @param paciente instancia de entidad Profesional
   * @param imagenes array de files
   */
  private addProfesional(profesional:Profesional, imagenes:any):void{
    const usrRef = collection(this.fire, 'profesionales');
    addDoc(usrRef, {})
    .then((refDoc) => {
      setDoc(refDoc, {
        id: refDoc.id,
        nombre: profesional.nombre,
        apellido: profesional.apellido,
        edad: profesional.edad,
        dni: profesional.dni,
        mail: profesional.mail,
        especialidad: profesional.especialidad,
        password: profesional.password,
        autorizado: profesional.autorizado
      });

      for(let i = 0; i < imagenes.length; i++){
        this.uploadImg(refDoc.id, imagenes[i]);
      }
    
    });
  }

  private addAdministrador(administrador:Administrador, imagenes:any):void{

    //Codigo...
  }

  /**
   * Obtiene el listado de especialidades desde la base de datos
   * @returns Observable<DocumentData[]>
   */
  getEspecialidades():Observable<especialidad[]>{
    const espRef = collection(this.fire, 'especialidades');
    return collectionData(espRef,{idField: 'id'}) as Observable<especialidad[]>;
  }

  /**
   * Guarda una nueva especialidad en la base de datos
   * @param especialidad 
   */
  addEspecialidad(especialidad:string){
    const espRef = collection(this.fire, 'especialidades');
    addDoc(espRef, {})
    .then((refDoc) => {
      setDoc(refDoc, {
        id: refDoc.id,
        nombre: especialidad
      });
    });
  }

  /**
   * Sube una imagen al Storage de firebase asociando la misma al id del usuario
   * @param idUsr id del usuario
   * @param img imagen a subir
   * @returns 
   */
  uploadImg(idUsr:string, img:any):void{
    const imgRef = ref(this.st, `${idUsr}/${img.name}`);
    uploadBytes(imgRef, img)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
  }

  /**
   * Descarga las imagenes del storage 
   */
  getImages(){
    const imagesRef = ref(this.st, `${this.idUsr}`);
    
    listAll(imagesRef)
    .then(async (response) => {
      
      for(let item of response.items){
        const url = await getDownloadURL(item);
        this.imagenes.push(url);
      }

    })
    .catch((error) => console.log(error));
  }

  getUsuarioPorMail(mail:string, nombreColeccion:string){
    
    const collectionRef = collection(this.fire, `${nombreColeccion}`);
    let q = query(collectionRef, where('mail', '==', mail));

    return getDocs(q);
    
  }

  verificarMail(){
    return sendEmailVerification(this.auth.currentUser as User);
  }
}
