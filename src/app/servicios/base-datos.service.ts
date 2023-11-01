import { Injectable } from '@angular/core';
import { Firestore, updateDoc, } from '@angular/fire/firestore';
import { getDocs,setDoc,doc,addDoc,collection,deleteDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Paciente } from '../clases/paciente';
import { Administrador } from '../clases/administrador';
import { Especialista } from '../clases/especialista';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  constructor(private firestore : Firestore) { }

  AltaUsuario(user:Paciente | Especialista | Administrador ){
   
    const coleccion = collection(this.firestore,'usuarios')
    const documento = doc(coleccion);
    const id = documento.id;

    user.id = id;
    let obj = JSON.parse(JSON.stringify(user));

    return setDoc(documento,obj);
  }
  
  TraerUsuarios(){
    const coleccion = collection(this.firestore,'usuarios')
    return collectionData(coleccion);
  }


}
