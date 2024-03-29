import { Injectable } from '@angular/core';
import { Firestore, updateDoc } from '@angular/fire/firestore';
import { getDocs,setDoc,doc,addDoc,getDoc,collection,deleteDoc,query,where } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Paciente } from '../clases/paciente';
import { Administrador } from '../clases/administrador';
import { Especialista } from '../clases/especialista';
import { Usuario } from '../clases/usuario';
import { Turno } from '../clases/turno';
import { HistoriaClinica } from '../clases/historia-clinica';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  constructor(private firestore : Firestore) { }

  ////USUARIOS

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

  ModificarUsuarioTurno(id:any,misTurnos:Array<any>)
  {
    console.log(misTurnos)
    const coleccion = collection(this.firestore,'usuarios')
    const documento = doc(coleccion,id)
    updateDoc(documento,{
      turnos : misTurnos
    });
  }

  
  ModificarUsuarioHorarios(id:any,misHorarios:any)
  {
    const coleccion = collection(this.firestore,'usuarios')
    const documento = doc(coleccion,id)
    updateDoc(documento,{
      horarios:misHorarios
    });
  }
  ////ESPECIALIDADES

  AltaEspecialidad(esp:string){
   
    const coleccion = collection(this.firestore,'especialidades')
    const documento = doc(coleccion);
    const id = documento.id;

    let especialidad = {
      especialidad:esp,
      id:id,
      foto:'https://firebasestorage.googleapis.com/v0/b/clinicaonline-a3637.appspot.com/o/imagenes%2Fespecialidades%2Fdefault.png?alt=media&token=29f17d4b-7882-4049-b90a-463cb72a69fe'
    }

    return setDoc(documento,especialidad);
  }
  
  TraerEspecialidades(){
    const coleccion = collection(this.firestore,'especialidades')
    return collectionData(coleccion);
  }

  ////TURNOS

  AltaTurno(turno:Turno){
   
    const coleccion = collection(this.firestore,'turnos')
    const documento = doc(coleccion);
    const id = documento.id;
    turno.id = documento.id;
    turno.diaDeSolicitud = Date.now()
    let obj = JSON.parse(JSON.stringify(turno))
    obj.especialista.turnos = null;
    obj.paciente.turnos = null;
    return setDoc(documento,obj);
  }
  
  TraerTurnos(){
    const coleccion = collection(this.firestore,'turnos')
    return collectionData(coleccion);
  }

  TraerTurnosSinAceptar(){
    const q = query(collection(this.firestore, 'turnos'), where("aceptado", "==", false));
    return collectionData(q)
  }

  async TraerTurnoPorId(id:string){
    let data:any;
    const q = query(collection(this.firestore, 'turnos'), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = JSON.parse(JSON.stringify(doc.data()))
    });

    return data
  }

  
  TraerTurnosPorIdUsuario(id:string,user : "Paciente" | "Especialista"){
    let q = query(collection(this.firestore, 'turnos'), where("uidEspe", "==", id));
    if(user === "Paciente"){
      q = query(collection(this.firestore, 'turnos'), where("uidPa", "==", id));
    }   
    return collectionData(q)
  }

  ModificarTurnoCancelado(id:any,motivo:string)
  {
    const coleccion = collection(this.firestore,'turnos')
    const documento = doc(coleccion,id)
    updateDoc(documento,{
      cancelado : true,
      diaDeCancelacion: Date.now(),
      motivoCancelado : motivo
    });
  }

  ModificarTurnoAceptar(id:any)
  {
    const coleccion = collection(this.firestore,'turnos')
    const documento = doc(coleccion,id)
    updateDoc(documento,{
      aceptado : true,
    });
  }

  ModificarTurnoFinalizado(id:any,resenia:string)
  {
    const coleccion = collection(this.firestore,'turnos')
    const documento = doc(coleccion,id)
    updateDoc(documento,{
      finalizado : true,
      diaDeFinalizacion: Date.now(),
      resenia : resenia
    });
  }

  ModificarTurnoEncuesta(id:any,encuesta:string){
    const coleccion = collection(this.firestore,'turnos')
    const documento = doc(coleccion,id)
    updateDoc(documento,{
      resultadoEncuesta : encuesta
    });
  }

  ModificarTurnoCalificacion(id:any,calificacion:string){
    const coleccion = collection(this.firestore,'turnos')
    const documento = doc(coleccion,id)
    updateDoc(documento,{
      calificacionAtencion : calificacion
    });
  }

    ////HISTORIA CLINICA

    AltaHistoriaClinica(historia:HistoriaClinica){ 
      const coleccion = collection(this.firestore,'historiasClinicas')
      const documento = doc(coleccion);
      const id = documento.id;
      historia.id = documento.id;
      historia.fechaDeCreacion = Date.now()
      let obj = JSON.parse(JSON.stringify(historia))
      return setDoc(documento,obj);
    }

    TraerHistoriasClinicas(){
      const coleccion = collection(this.firestore,'historiasClinicas')
      return collectionData(coleccion);
    }
  
    TraerHistoriasClinicasPorIdUsuario(id:string,user : "Especialista" | "Paciente"){

      let q = query(collection(this.firestore, 'historiasClinicas'), where("idPaciente", "==", id));

      if(user === "Especialista"){
        q = query(collection(this.firestore, 'historiasClinicas'), where("idEspecialista", "==", id));
      }
      
      return collectionData(q)
    }

  codigoRandom(){

    let codigoArr = ['a','b','c','d',1,3,5,7]
    return codigoArr.sort(() => Math.random() - 0.5).join("");
  }

  AltaLog(usuario:any){ 
    const coleccion = collection(this.firestore,'logs')
    const documento = doc(coleccion);
    const id = documento.id;
    let log : any = {
      id:id,
      fechaLog : Date.now(),
      user: usuario,
    }
    return setDoc(documento,log);
  }

  TraerLogs(){
    const coleccion = collection(this.firestore,'logs')
    return collectionData(coleccion);
  }


}
