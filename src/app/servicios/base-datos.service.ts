import { Injectable } from '@angular/core';
import { Firestore, updateDoc } from '@angular/fire/firestore';
import { getDocs,setDoc,doc,addDoc,getDoc,collection,deleteDoc,query,where } from 'firebase/firestore';
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

  async TraerUsuarioPorId(id:string){
    const docRef = doc(this.firestore,'usuarios',id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    return docSnap.data()
  }

 async TraerUsuarioPorEmail(email:string){
    let data:any;
    const q = query(collection(this.firestore, 'usuarios'), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = JSON.parse(JSON.stringify(doc.data()))
    });

    return data
  }


}
