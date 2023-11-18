import { AfterContentInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements AfterContentInit {

  especialidades:Array<any> = [];
  especialistas:Array<Especialista> = [];
  turnos:Array<Turno> = [];
  turnosFijosBd:Array<Turno> = [];
  paciente:Paciente = new Paciente;

  turnosFiltro:Array<Turno> = [];

  constructor(private bd : BaseDatosService, private ruta :Router, private log : LocalStorageEncriptService,private spinner: NgxSpinnerService){
   
  }

  ngAfterContentInit() {

    this.spinner.show();

    let logObj = this.log.GetEncriptStorage()

    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.paciente = obj;
      this.TraerTurnosPaId();
      this.bd.TraerEspecialidades().subscribe((esp)=>{
        this.especialidades = esp as Array<any>
        console.log(this.especialidades)
      })
      this.bd.TraerUsuarioPorTipo('Especialista').subscribe((esp)=>{
        this.especialistas = esp as Array<Especialista>
        let arr : Array<any> = []
        let equal = false;
        for(let turno of this.turnos){
          for(let esp of  this.especialistas){
            if(esp.id === turno.especialista?.id){
              if(arr.length > 0){
                equal = false 
                for(let e of  arr){
                  if(e.id === esp.id){
                    //arr.push(esp)
                    equal = true;
                    break;
                  }
                }

                if(!equal){
                  arr.push(esp)
                }

              }else{
                arr.push(esp)
                break;
              }
            }
          }
        }
        this.especialistas = arr;
        console.log(this.especialistas)
      })
    })

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);
  }
  
  TraerTurnosPaId(){
    this.bd.TraerTurnosPorIdUsuario(this.paciente.id as string,"Paciente").subscribe((t:any)=>{
        this.turnos = t
        this.turnosFijosBd = t
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

  selectTurnos = true;
  selectEspecialidad = false;
  selectEspecialista = false;
  selectFiltro = false;

  calificar = false;
  encuesta = false;
  resenia = false;
  cancelar= false;

  turno:Turno = new Turno;
  fotoEsp:any = "../../../../../assets/imagenes/logo.png";
  espNombre = "xxx";
  fotoE:any = "../../../../../assets/imagenes/logo.png";
  eNombreApellido = "xxx";

  motivo = ""



  pregunta1 = false;
  pregunta2 = false;
  pregunta3 = false;
  pregunta4 = false;
  pregunta5 = false;
  encuestaRF = true;
  resultEncuesta = "";

  fechaInicial:any
  fechaFinal:any
  horaInicio = "08:00"
  horaFin = "22:00"
  datePipe = new DatePipe('en-Ar')
  
  ChangeToSelectEspecialista(){
    this.selectTurnos = false;
    this.selectEspecialidad = false;
    this.selectEspecialista = true;
    this.selectFiltro = false;
  }

  ChangeToSelectEspecialdiad(){
    this.selectTurnos = false;
    this.selectEspecialidad = true;
    this.selectEspecialista = false;
    this.selectFiltro = false;
  }

  ChangeToSelectTurno(){
    this.selectTurnos = true;
    this.selectEspecialidad = false;
    this.selectEspecialista = false;
    this.selectFiltro = false;
  }

  ChangeToSelectFiltro(){
    this.selectTurnos = false;
    this.selectEspecialidad = false;
    this.selectEspecialista = false;
    this.selectFiltro = true;
  }

  SelectEspecialdiad(esp:any){
    this.turnos = this.turnosFijosBd;
    let tu : Array<Turno> = []
      for(let turno of this.turnos){
          if(esp === turno.especialidad){
            tu.push(turno);
          }
      }
    this.turnos = tu;
    this.ChangeToSelectTurno();
  }

  SelectEspecialista(esp:Especialista){
    this.turnos = this.turnosFijosBd;
    let tu : Array<Turno> = []
    for(let t of esp.turnos){
      for(let turno of this.turnos){
          if(t.id === turno.id){

            if(tu.length > 0){
              for(let tur of tu){
                if(tur.id !== turno.id){
                  tu.push(turno);
                  break;
                }
              }
            }else{
              tu.push(turno);
              break;
            }
          }
      }
    }
    this.turnos = tu;
    this.ChangeToSelectTurno();
  }

  FiltroTomado(){
    this.turnos = this.turnosFijosBd
    this.turnos.forEach((t:Turno) => {
      if(t.aceptado === false || t.finalizado === true ){
        this.turnos = this.turnos.filter((i) => i !== t)
      }
    });
    this.selectFiltro = false;
    this.selectTurnos = true;
  }

  FiltroFinalizado(){
    this.turnos = this.turnosFijosBd
    this.turnos.forEach((t:Turno) => {
      if(t.aceptado === false || t.finalizado === false){
        this.turnos = this.turnos.filter((i) => i !== t)
      }
    });
    this.selectFiltro = false;
    this.selectTurnos = true;
  }

  FiltroSolicitado(){
    this.turnos = this.turnosFijosBd
    this.turnos.forEach((t:Turno) => {
      if(t.aceptado === true || t.finalizado === true){
        this.turnos = this.turnos.filter((i) => i !== t)
      }
    });
    this.selectFiltro = false;
    this.selectTurnos = true;
  }

  FiltroFecha(){
    if(this.fechaInicial != undefined && this.fechaFinal != undefined){

      this.turnos = this.turnosFijosBd
      let fechaTurno = ""

      this.turnos.forEach((t:Turno) => {
        fechaTurno = t.anio+"-"+t.mes+"-"+t.dia

        if(fechaTurno < this.fechaInicial || fechaTurno > this.fechaFinal){


          this.turnos = this.turnos.filter((i) => i !== t)
        }
      });
      this.selectFiltro = false;
      this.selectTurnos = true;


    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'Porfavor coloque las fechas de inicio y fin',
        color:'#fb7474',
      })
    }
  }

  Reset(){
    this.turnos = this.turnosFijosBd;
    this.OpcionesFalse()
  }

  OpcionesFalse(){
    this.calificar = false;
    this.encuesta = false;
    this.cancelar = false;
    this.resenia = false;
    this.turno = new Turno
    this.fotoEsp = "../../../../../assets/imagenes/logo.png";
    this.espNombre = "xxx";
    this.fotoE = "../../../../../assets/imagenes/logo.png";
    this.eNombreApellido = "xxx";
  }

  TurnosCancelar(){
    let turnosCancelar = []
    this.turnosFiltro = []
    for(let t of this.turnos){
      if(t.cancelado === false && t.finalizado === false){
        turnosCancelar.push(t);
      }
    }
    this.turnosFiltro = turnosCancelar;
  }

  
  TurnosResenia(){
    let turnosResenia = []
    this.turnosFiltro = []
    for(let t of this.turnos){
      if(t.aceptado === true && t.cancelado === false && t.finalizado === true){
        turnosResenia.push(t);
      }
    }
    this.turnosFiltro = turnosResenia;
  }

  SelectTurno(turno:Turno,accion : "Encuesta" | "Cancelar" | "Resenia" | "Calificar"){
    this.turno = turno
    for(let e of this.especialidades){
      if(e.especialidad === turno.especialidad){
        this.espNombre = e.especialidad
        this.fotoEsp = e.foto
      }
    }

    this.eNombreApellido = turno.especialista?.nombre +" "+turno.especialista?.apellido;
    let x = true;
    this.turno.especialista?.fotos.forEach((foto:any)=>{
      if(x)
      {
        this.fotoE = foto.path as string
        x = false
      }
    })
    
    if(accion === "Encuesta"){this.encuesta = true, this.cancelar = false, this.calificar = false, this.resenia = false}
    if(accion === "Cancelar"){this.cancelar = true, this.encuesta = false, this.calificar = false, this.resenia = false}
    if(accion === "Calificar"){this.calificar = true, this.cancelar = false, this.encuesta = false, this.resenia = false}
    if(accion === "Resenia"){this.resenia = true, this.cancelar = false, this.calificar = false, this.encuesta = false}
  }


  CancerlarTurno(){

    if(this.motivo.length >= 25){


      this.bd.TraerUsuarioPorId( this.turno.especialista?.id as string).then((esp:any)=>{
         esp.turnos.forEach((t:Turno)=>{
          if(t.mes == this.turno.mes && this.turno.dia == t.dia)
          {
            t.cancelado = true;
            t.diaDeCancelacion = Date.now();
            t.motivoCancelado = this.motivo;
            t.id = this.turno.id
          }
        })
        this.bd.ModificarUsuarioTurno(this.turno.especialista?.id as string, esp.turnos as Array<any>);
        this.bd.TraerUsuarioPorId( this.turno.paciente?.id as string).then((pa:any)=>{
          pa.turnos.forEach((t:Turno)=>{
            if(t.mes == this.turno.mes && this.turno.dia == t.dia)
            {
              t.cancelado = true;
              t.diaDeCancelacion = Date.now();
              t.motivoCancelado = this.motivo;
              t.id = this.turno.id
            }
          })
          this.bd.ModificarUsuarioTurno(this.turno.paciente?.id as string, pa.turnos as Array<any>);
          this.bd.ModificarTurnoCancelado(this.turno.id,this.motivo)
          
          this.Toast.fire({
            icon: 'success',
            title: 'Turno Cancelado',
            color:'#80ED99',
          })
          this.cancelar = false
          this.Reset()
        })
      })
     }else{
      if(this.motivo = ""){
        this.Toast.fire({
          icon: 'error',
          title: 'Porfavor detalle el motivo',
          color:'#fb7474',
        })
      }else{
        this.Toast.fire({
          icon: 'error',
          title: 'Coloque minimo 25 letras',
          color:'#fb7474',
        })
      }
    }
  }


  EvaluarPregunta(p : '0' | '1' | '2' | '3' | '4' | '5', r : 'Excelente' | 'Bien' | 'Mal' | ''){
    let respuesta = ""
    if(r === "Excelente"){respuesta = "⭐⭐"}else if(r === "Bien"){respuesta = "⭐"}else if(r === "Mal"){respuesta = ""}
    switch(p){
      case '0':
        this.encuestaRF = false;
        this.pregunta1 = true;
      break;
      case'1':
        this.pregunta1 = false;
        this.pregunta2 = true;
      break;
      case'2':
        this.pregunta2 = false;
        this.pregunta3 = true;
      break;
      case'3':
        this.pregunta3 = false;
        this.pregunta4 = true;
      break;
      case'4':
        this.pregunta4 = false;
        this.pregunta5 = true;
      break;
      case'5':
        this.pregunta5 = false;
        this.encuestaRF = true;
        this.EnviarEncuesta()
      break;
    }

    this.resultEncuesta += respuesta;
    console.log(this.resultEncuesta)
  }

  EnviarEncuesta(){
    if(this.resultEncuesta === ""){this.resultEncuesta = "⭐"}
    this.EncuestaTurno()
  }

  CalificarTurno(){
    if(this.motivo.length >= 25){


      this.bd.TraerUsuarioPorId( this.turno.especialista?.id as string).then((esp:any)=>{
         esp.turnos.forEach((t:Turno)=>{
          if(t.mes == this.turno.mes && this.turno.dia == t.dia)
          {
            t.calificacionAtencion = this.motivo;
            t.id = this.turno.id
          }
        })
        this.bd.ModificarUsuarioTurno(this.turno.especialista?.id as string, esp.turnos as Array<any>);
        this.bd.TraerUsuarioPorId( this.turno.paciente?.id as string).then((pa:any)=>{
          pa.turnos.forEach((t:Turno)=>{
            if(t.mes == this.turno.mes && this.turno.dia == t.dia)
            {
              t.calificacionAtencion = this.motivo;
              t.id = this.turno.id
            }
          })
          this.bd.ModificarUsuarioTurno(this.turno.paciente?.id as string, pa.turnos as Array<any>);
          this.bd.ModificarTurnoCalificacion(this.turno.id,this.motivo)

          
          this.Toast.fire({
            icon: 'success',
            title: 'Turno Calificado',
            color:'#80ED99',
          })
          this.Reset()
        })
      })
     }else{
      if(this.motivo = ""){
        this.Toast.fire({
          icon: 'error',
          title: 'Porfavor Califique el turno',
          color:'#fb7474',
        })
      }else{
        this.Toast.fire({
          icon: 'error',
          title: 'Coloque minimo 25 letras',
          color:'#fb7474',
        })
      }
    }
  }

  EncuestaTurno(){
    this.bd.TraerUsuarioPorId( this.turno.especialista?.id as string).then((esp:any)=>{
      esp.turnos.forEach((t:Turno)=>{
       if(t.mes == this.turno.mes && this.turno.dia == t.dia)
       {
         t.resultadoEncuesta = this.resultEncuesta;
         t.id = this.turno.id
       }
     })
     this.bd.ModificarUsuarioTurno(this.turno.especialista?.id as string, esp.turnos as Array<any>);
     this.bd.TraerUsuarioPorId( this.turno.paciente?.id as string).then((pa:any)=>{
       pa.turnos.forEach((t:Turno)=>{
         if(t.mes == this.turno.mes && this.turno.dia == t.dia)
         {
          t.resultadoEncuesta = this.resultEncuesta;
          t.id = this.turno.id
         }
       })
       this.bd.ModificarUsuarioTurno(this.turno.paciente?.id as string, pa.turnos as Array<any>);  
       this.bd.ModificarTurnoEncuesta(this.turno.id,this.resultEncuesta);
       this.Toast.fire({
         icon: 'success',
         title: 'Encuesta Realizada',
         color:'#80ED99',
       })
       this.Reset()
     })
   })
  }

}
