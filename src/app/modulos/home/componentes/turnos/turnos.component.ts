import { AfterContentInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';

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

  constructor(private bd : BaseDatosService, private ruta :Router, private log : LocalStorageEncriptService){
   
  }

  ngAfterContentInit() {
    let logObj = this.log.GetEncriptStorage()

    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.paciente = obj;
    })

    this.bd.TraerEspecialidades().subscribe((esp)=>{
      this.especialidades = esp as Array<any>
      console.log(this.especialidades)
    })

    this.bd.TraerTurnos().subscribe((turnos)=>{
      let arr : Array<Turno> = turnos;
      for(let t of this.paciente.turnos){
        for(let turno of  arr){
          if(turno.id === t.id){
            this.turnos.push(turno);
            this.turnosFijosBd.push(turno)
            break;
          }
        }
      }
      console.log(this.turnos)
      this.TurnosCancelar()
    })
    this.bd.TraerUsuarioPorTipo('Especialista').subscribe((esp)=>{
      this.especialistas = esp as Array<Especialista>
      let arr : Array<any> = []
      for(let turno of this.turnos){
        for(let esp of  this.especialistas){
          if(esp.id === turno.especialista?.id){

            if(arr.length > 0){
              for(let p of  arr){
                if(p.id !== esp.id){
                  arr.push(esp)
                }
              }
            }else{
              arr.push(esp)
            }

          }
        }
      }
      this.especialistas = arr;
      console.log(this.especialistas)
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

  calificarT = false;
  encuestaT = false;
  cancelarT = true;
  reseniaT = false;

  pregunta1 = false;
  pregunta2 = false;
  pregunta3 = false;
  pregunta4 = false;
  pregunta5 = false;
  encuestaRF = true;
  resultEncuesta = "";


  ChangeToSelectEspecialista(){
    this.selectTurnos = false;
    this.selectEspecialidad = false;
    this.selectEspecialista = true;
  }

  ChangeToSelectEspecialdiad(){
    this.selectTurnos = false;
    this.selectEspecialidad = true;
    this.selectEspecialista = false;
  }

  ChangeToSelectTurno(){
    this.selectTurnos = true;
    this.selectEspecialidad = false;
    this.selectEspecialista = false;
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
    if(this.reseniaT || this.encuestaT || this.calificarT  ){ this.TurnosResenia();}else if(this.cancelarT){this.TurnosCancelar();}
    this.ChangeToSelectTurno();
  }

  SelectEspecialista(esp:Especialista){
    this.turnos = this.turnosFijosBd;
    let tu : Array<Turno> = []
    for(let t of esp.turnos){
      for(let turno of this.turnos){
          if(t.id === turno.id){
            tu.push(turno);
          }
      }
    }
    this.turnos = tu;
    if(this.reseniaT || this.encuestaT || this.calificarT  ){ this.TurnosResenia();}else if(this.cancelarT){this.TurnosCancelar();}
    this.ChangeToSelectTurno();
  }

  Reset(){
    this.turnos = this.turnosFijosBd;
    if(this.reseniaT || this.encuestaT || this.calificarT  ){ this.TurnosResenia();}else if(this.cancelarT){this.TurnosCancelar();}
  }

  ChangeCalificarT(){
    this.calificarT = true;
    this.encuestaT = false;
    this.cancelarT = false;
    this.reseniaT = false;
    this.TurnosResenia()

    this.OpcionesFalse()
    
    this.turno = new Turno

  }

  ChangeEncuestaT(){
    this.calificarT = false;
    this.encuestaT = true;
    this.cancelarT = false;
    this.reseniaT = false;
    this.TurnosResenia()

    this.OpcionesFalse()

    this.turno = new Turno
  }

  ChangeCancelarT(){
    this.calificarT = false;
    this.encuestaT = false;
    this.cancelarT = true;
    this.reseniaT = false;
    this.TurnosCancelar()

    this.OpcionesFalse()

    this.turno = new Turno
  }

  ChangeReseniaT(){
    this.calificarT = false;
    this.encuestaT = false;
    this.cancelarT = false;
    this.reseniaT = true;
    this.TurnosResenia()

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

  SelectTurno(turno:Turno){
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
    
    if(this.calificarT){this.calificar = true}
    if(this.encuestaT){this.encuesta = true}
    if(this.cancelarT){this.cancelar = true}
    if(this.reseniaT){this.resenia = true}
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
          this.ruta.navigateByUrl('home/miPerfil');
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
          this.ruta.navigateByUrl('home/miPerfil');
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
       this.ruta.navigateByUrl('home/miPerfil');
     })
   })
  }

}
