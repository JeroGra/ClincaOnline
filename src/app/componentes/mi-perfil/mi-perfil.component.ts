import { AfterContentInit, Component } from '@angular/core';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent  implements AfterContentInit {

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
  dia = "Lunes";

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

  misHorarios:any;

  constructor(private log : LocalStorageEncriptService, private bd : BaseDatosService,private spinner: NgxSpinnerService){
 
  } 
    

  ngAfterContentInit() {

    this.spinner.show();
    


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
        this.misHorarios = this.user.horarios
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

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);

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
    this.esLunes = true;
    this.esMartes = false;
    this.esMiercoles = false;
    this.esJueves = false;
    this.esViernes = false;
    this.esSabado = false;
    this.dia = "Lunes";
  } 

  Martes(){
    this.esLunes = false;
    this.esMartes = true;
    this.esMiercoles = false;
    this.esJueves = false;
    this.esViernes = false;
    this.esSabado = false;
    this.dia = "Martes";
  }

  Miercoles(){
    this.esLunes = false;
    this.esMartes = false;
    this.esMiercoles = true;
    this.esJueves = false;
    this.esViernes = false;
    this.esSabado = false;
    this.dia = "Miercoles";
  }

  Jueves(){
    this.esLunes = false;
    this.esMartes = false;
    this.esMiercoles = false;
    this.esJueves = true;
    this.esViernes = false;
    this.esSabado = false;
    this.dia = "Jueves";
  }

  Viernes(){
    this.esLunes = false;
    this.esMartes = false;
    this.esMiercoles = false;
    this.esJueves = false;
    this.esViernes = true;
    this.esSabado = false;
    this.dia = "Viernes";
  }

  Sabado(){
    this.esLunes = false;
    this.esMartes = false;
    this.esMiercoles = false;
    this.esJueves = false;
    this.esViernes = false;
    this.esSabado = true;
    this.dia = "Sabado";
  }

  SetHoras(){


    if(this.horaDe !== undefined && this.horaHasta !== undefined ){

      let id = this.user.id

      if(this.esLunes){
        this.user.horarios.lunes =  this.objHorarios.lunes;
        this.objHorarios.lunes.inicio = this.horaDe;
        this.objHorarios.lunes.fin = this.horaHasta;
      } else if(this.esMartes){
        this.user.horarios.martes =  this.objHorarios.martes;
        this.objHorarios.martes.inicio = this.horaDe;
        this.objHorarios.martes.fin = this.horaHasta;
      }else if (this.esMiercoles){
        this.user.horarios.miercoles =  this.objHorarios.miercoles;
        this.objHorarios.miercoles.inicio = this.horaDe;
        this.objHorarios.miercoles.fin = this.horaHasta;
      }else if (this.esJueves){
        this.user.horarios.jueves =  this.objHorarios.jueves;
        this.objHorarios.jueves.inicio = this.horaDe;
        this.objHorarios.jueves.fin = this.horaHasta;
      }else if (this.esViernes){
        this.user.horarios.viernes =  this.objHorarios.viernes;
        this.objHorarios.viernes.inicio = this.horaDe;
        this.objHorarios.viernes.fin = this.horaHasta;
      } else if(this.esSabado){
        this.user.horarios.sabado =  this.objHorarios.sabado;
        this.objHorarios.sabado.inicio = this.horaDe;
        this.objHorarios.sabado.fin = this.horaHasta;
      }

      this.bd.ModificarUsuarioHorarios(id,this.user.horarios);
      this.Toast.fire({
        icon: 'success',
        title: 'Horario del Lunes Actualizado',
        color:'#80ED99',
      })

    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'Coloque los horarios',
        color:'#fb7474',
      })      
    }
  }

}
