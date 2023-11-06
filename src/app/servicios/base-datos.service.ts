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

   TraerUsuarioPorTipo(tipo:string){
    const q = query(collection(this.firestore, 'usuarios'), where("tipo", "==", tipo));
    return collectionData(q)
  }

  ModificarUsuario(id:string,usuario:any)
  {
    const coleccion = collection(this.firestore,'usuarios')
    const documento = doc(coleccion,id);
    let obj = JSON.parse(JSON.stringify(usuario));
    updateDoc(documento,obj);
  }
  
  ModificarVerificacionUsuario(id:string)
  {
    const coleccion = collection(this.firestore,'usuarios')
    const documento = doc(coleccion,id)
    updateDoc(documento,{
      cuentaValidadaEmail:true
    });
  }

  ModificarCuentaHabilitada(id:string,habilitada:boolean)
  {
    const coleccion = collection(this.firestore,'usuarios')
    const documento = doc(coleccion,id)
    updateDoc(documento,{
      cuentaHabilitada:habilitada
    });
  }

  codigoRandom(){

    let codigoArr = ['a','b','c','d',1,3,5,7]
    return codigoArr.sort(() => Math.random() - 0.5).join("");
  }

}
