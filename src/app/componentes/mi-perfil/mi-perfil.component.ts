import { Component } from '@angular/core';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {

  objLog:any
  user:any;
  imagenes:any;
  esUser = false;
  esEspecialista = false;
  esPaciente = false;
  imgUserUno = "";
  imgUserDos = "";
  miPerf = true;
  misHoras = false;

  esLunes = true;
  esMartes = false;
  esMiercoles = false;
  esJueves = false;
  esViernes = false;
  esSabado = false;

  horaDe:any;
  horaHasta:any

  objHorarios = {
    lunes:{
      inicio:null,
      fin:null,
    },
    martes:{
      inicio:null,
      fin:null,
    },
    miercoles:{
      inicio:null,
      fin:null,
    },
    jueves:{
      inicio:null,
      fin:null,
    },
    viernes:{
      inicio:null,
      fin:null,
    },
    sabado:{
      inicio:null,
      fin:null,
    }
  }

  constructor(private log : LocalStorageEncriptService, private bd : BaseDatosService){
   this.objLog = this.log.GetEncriptStorage();
    this.bd.TraerUsuarioPorEmail(this.objLog.email).then((user)=>{
      this.user = user;
      this.imagenes = this.user.fotos;
      if(this.user.tipo === "Paciente"){
        console.log("es paciente")
        this.esPaciente = true;
        this.esUser = true;
      }else if(this.user.tipo === "Especialista"){
        this.esEspecialista = true;
        this.esUser = true;
      }else{
        this.esPaciente = true;
        this.esUser = true;
      }

      let primerEntrada = true;
       for(let img of this.imagenes){
         if(this.esPaciente){
           if(primerEntrada){
             primerEntrada = false;
             this.imgUserUno = img.path;
           }else{
             this.imgUserDos = img.path;
             break;
           }
         }else{
           this.imgUserUno = img.path;
           this.imgUserDos = "../../../assets/imagenes/logo.png";
           break;
         }
       }
    })
  } 

  private Toast = Swal.mixin({
    toast: true,
    position: 'top',
    background:'#22577A',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Perfil(){
    this.miPerf = true;
    this.misHoras = false;
  }

  Horas(){
    this.miPerf = false;
    this.misHoras = true;
  }

  Lunes(){

  }

  Martes(){
    
  }

  Miercoles(){

  }

  Jueves(){

  }

  Viernes(){

  }

  Sabado(){

  }

  SetHoras(){

    if(this.horaDe !== undefined && this.horaHasta !== undefined ){

      if(this.esLunes){
        let id = this.objLog.id
        this.objLog.user.horarios.lunes =  this.objHorarios.lunes;
        this.objHorarios.lunes.inicio = this.horaDe;
        this.objHorarios.lunes.fin = this.horaHasta;
        this.bd.ModificarUsuarioHorarios(id,this.objLog.user.horarios);
        this.Toast.fire({
          icon: 'success',
          title: 'Horario del Lunes Actualizado',
          color:'#80ED99',
        })
      }
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'Coloque los horarios',
        color:'#fb7474',
      })
    }
  }

}
