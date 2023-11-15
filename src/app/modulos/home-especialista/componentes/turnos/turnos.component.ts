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
export class TurnosComponent  implements AfterContentInit {

  especialidades:Array<any> = [];
  pacientes:Array<Paciente> = [];
  turnos:Array<Turno> = [];
  turnosFijosBd:Array<Turno> = [];
  especialista:Especialista = new Especialista;

 // turnosParaAceparRechazar:Array<Turno> = [];
 // turnosParaCancelarFinalizar:Array<Turno> = [];

  turnosFiltro:Array<Turno> = [];

  constructor(private bd : BaseDatosService, private ruta :Router, private log : LocalStorageEncriptService){
   
  }
  
  ngAfterContentInit() {
    let logObj = this.log.GetEncriptStorage()

    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.especialista = obj;
    })

    this.bd.TraerEspecialidades().subscribe((esp)=>{
      this.especialidades = esp as Array<any>
      let arr : Array<any> = []
      for(let esp of this.especialista.especialidades){
        for(let e of  this.especialidades){
          if(e.especialidad === esp){
            arr.push(e)
            break;
          }
        }
      }
      this.especialidades = arr;
      console.log(this.especialidades)
    })

    this.bd.TraerTurnos().subscribe((turnos)=>{
      let arr : Array<Turno> = turnos;
      for(let t of this.especialista.turnos){
        for(let turno of  arr){
          if(turno.id === t.id){
            this.turnos.push(turno);
            this.turnosFijosBd.push(turno)
            break;
          }
        }
      }
      console.log(this.turnos)
      this.TurnosAceptarRechazar()
    })
    this.bd.TraerUsuarioPorTipo('Paciente').subscribe((pa)=>{
      this.pacientes = pa as Array<Paciente>
      let arr : Array<any> = []
      for(let turno of this.turnos){
        for(let pa of  this.pacientes){
          if(pa.id === turno.paciente?.id){

            if(arr.length > 0){
              for(let p of  arr){
                if(p.id !== pa.id){
                  arr.push(pa)
                }
              }
            }else{
              arr.push(pa)
            }

          }
        }
      }
      this.pacientes = arr;
      console.log(this.pacientes)
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
  selectPaciente = false;

  aceptar = false;
  finalizar = false;
  rechazar = false;
  resenia = false;
  cancelar= false;

  turno:Turno = new Turno;
  fotoEsp:any = "../../../../../assets/imagenes/logo.png";
  espNombre = "xxx";
  fotoPa:any = "../../../../../assets/imagenes/logo.png";
  paNombreApellido = "xxx";

  motivo = ""

  aceptarT = true;
  rechazarT = false;
  cancelarT = false;
  finalizarT = false;
  reseniaT = false;

  ChangeToSelectPaciente(){
    this.selectTurnos = false;
    this.selectEspecialidad = false;
    this.selectPaciente= true;
  }

  ChangeToSelectEspecialdiad(){
    this.selectTurnos = false;
    this.selectEspecialidad = true;
    this.selectPaciente = false;
  }

  ChangeToSelectTurno(){
    this.selectTurnos = true;
    this.selectEspecialidad = false;
    this.selectPaciente = false;
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
    if(this.aceptarT || this.rechazarT  ){ this.TurnosAceptarRechazar();}else if(this.cancelarT || this.finalizarT){this.TurnosCancelarFinalizar();}else if(this.reseniaT){this.TurnosResenia()}
    this.ChangeToSelectTurno();
  }

  SelectPaciente(pa:Paciente){
    this.turnos = this.turnosFijosBd;
    let tu : Array<Turno> = []
    for(let t of pa.turnos){
      for(let turno of this.turnos){
          if(t.id === turno.id){
            tu.push(turno);
          }
      }
    }
    this.turnos = tu;
    if(this.aceptarT || this.rechazarT  ){ this.TurnosAceptarRechazar();}else if(this.cancelarT || this.finalizarT){this.TurnosCancelarFinalizar();}else if(this.reseniaT){this.TurnosResenia()}
    this.ChangeToSelectTurno();
  }

  Reset(){
    this.turnos = this.turnosFijosBd;
    if(this.aceptarT || this.rechazarT  ){ this.TurnosAceptarRechazar();}else if(this.cancelarT || this.finalizarT){this.TurnosCancelarFinalizar();}else if(this.reseniaT){this.TurnosResenia()}
  }

  ChangeAceptarT(){
    this.aceptarT = true;
    this.rechazarT = false;
    this.cancelarT = false;
    this.finalizarT = false;
    this.reseniaT = false;
    this.TurnosAceptarRechazar()

    this.OpcionesFalse()
    
    this.turno = new Turno

  }

  ChangeRechazarT(){
    this.aceptarT = false;
    this.rechazarT = true;
    this.cancelarT = false;
    this.finalizarT = false;
    this.reseniaT = false;
    this.TurnosAceptarRechazar()

    this.OpcionesFalse()

    this.turno = new Turno
  }

  ChangeCancelarT(){
    this.aceptarT = false;
    this.rechazarT = false;
    this.cancelarT = true;
    this.finalizarT = false;
    this.reseniaT = false;
    this.TurnosCancelarFinalizar()

    this.OpcionesFalse()

    this.turno = new Turno
  }

  ChangeFinalizarT(){
    this.aceptarT = false;
    this.rechazarT = false;
    this.cancelarT = false;
    this.finalizarT = true;
    this.reseniaT = false;
    this.TurnosCancelarFinalizar()

    this.OpcionesFalse()


  }

  ChangeReseniaT(){
    this.aceptarT = false;
    this.rechazarT = false;
    this.cancelarT = false;
    this.finalizarT = false;
    this.reseniaT = true;
    this.TurnosResenia()

    this.OpcionesFalse()

  }

  OpcionesFalse(){
    this.aceptar = false;
    this.rechazar = false;
    this.cancelar = false;
    this.finalizar = false;
    this.resenia = false;
    this.turno = new Turno
    this.fotoEsp = "../../../../../assets/imagenes/logo.png";
    this.espNombre = "xxx";
    this.fotoPa = "../../../../../assets/imagenes/logo.png";
    this.paNombreApellido = "xxx";
  }

  TurnosAceptarRechazar(){
    let turnosParaAceparRechazar = []
    this.turnosFiltro = []
    for(let t of this.turnos){
      if(t.aceptado === false && t.cancelado === false && t.finalizado === false){
        turnosParaAceparRechazar.push(t);
      }
    }
    this.turnosFiltro = turnosParaAceparRechazar
  }

  TurnosCancelarFinalizar(){
    let turnosCancelarFinalizar = []
    this.turnosFiltro = []
    for(let t of this.turnos){
      if(t.aceptado === true && t.cancelado === false && t.finalizado === false){
        turnosCancelarFinalizar.push(t);
      }
    }
    this.turnosFiltro = turnosCancelarFinalizar;
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

    this.paNombreApellido = turno.paciente?.nombre +" "+turno.paciente?.apellido;
    let x = true;
    this.turno.paciente?.fotos.forEach((foto:any)=>{
      if(x)
      {
        this.fotoPa = foto.path as string
        x = false
      }
    })
    
    if(this.aceptarT){this.aceptar = true}
    if(this.rechazarT){this.rechazar = true}
    if(this.cancelarT){this.cancelar = true}
    if(this.finalizarT){this.finalizar = true}
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
            if(this.rechazarT){
              t.motivoCancelado = "Rechazado: "+ this.motivo;
            }else{
              t.motivoCancelado = this.motivo;
            }
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
              if(this.rechazarT){
                t.motivoCancelado = "Rechazado: "+ this.motivo;
              }else{
                t.motivoCancelado = this.motivo;
              }
              t.id = this.turno.id
            }
          })
          this.bd.ModificarUsuarioTurno(this.turno.paciente?.id as string, pa.turnos as Array<any>);
          if(this.rechazarT){
            this.bd.ModificarTurnoCancelado(this.turno.id, "Rechazado: "+this.motivo)
          }else{
            this.bd.ModificarTurnoCancelado(this.turno.id,this.motivo)
          }  
          
          this.Toast.fire({
            icon: 'success',
            title: 'Turno Cancelado/Rechazado',
            color:'#80ED99',
          })
          this.ruta.navigateByUrl('homeEspecialista/miPerfil');
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

  FinalizarTurno(){
    if(this.motivo.length >= 25){


      this.bd.TraerUsuarioPorId( this.turno.especialista?.id as string).then((esp:any)=>{
         esp.turnos.forEach((t:Turno)=>{
          if(t.mes == this.turno.mes && this.turno.dia == t.dia)
          {
            t.finalizado = true;
            t.diaDeFinalizacion = Date.now();
            t.resenia = this.motivo;
            t.id = this.turno.id
          }
        })
        this.bd.ModificarUsuarioTurno(this.turno.especialista?.id as string, esp.turnos as Array<any>);
        this.bd.TraerUsuarioPorId( this.turno.paciente?.id as string).then((pa:any)=>{
          pa.turnos.forEach((t:Turno)=>{
            if(t.mes == this.turno.mes && this.turno.dia == t.dia)
            {
              t.finalizado = true;
              t.diaDeFinalizacion = Date.now();
              t.resenia = this.motivo;
              t.id = this.turno.id
            }
          })
          this.bd.ModificarUsuarioTurno(this.turno.paciente?.id as string, pa.turnos as Array<any>);
          this.bd.ModificarTurnoFinalizado(this.turno.id,this.motivo)

          
          this.Toast.fire({
            icon: 'success',
            title: 'Turno Finalizado',
            color:'#80ED99',
          })
          this.ruta.navigateByUrl('homeEspecialista/miPerfil');
        })
      })
     }else{
      if(this.motivo = ""){
        this.Toast.fire({
          icon: 'error',
          title: 'Porfavor Diagnostique el turno',
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

  AceptarTurno(){
    this.bd.TraerUsuarioPorId( this.turno.especialista?.id as string).then((esp:any)=>{
      esp.turnos.forEach((t:Turno)=>{
       if(t.mes == this.turno.mes && this.turno.dia == t.dia)
       {
         t.aceptado = true;
         t.id = this.turno.id
       }
     })
     this.bd.ModificarUsuarioTurno(this.turno.especialista?.id as string, esp.turnos as Array<any>);
     this.bd.TraerUsuarioPorId( this.turno.paciente?.id as string).then((pa:any)=>{
       pa.turnos.forEach((t:Turno)=>{
         if(t.mes == this.turno.mes && this.turno.dia == t.dia)
         {
          t.aceptado = true;
          t.id = this.turno.id
         }
       })
       this.bd.ModificarUsuarioTurno(this.turno.paciente?.id as string, pa.turnos as Array<any>);  
       this.bd.ModificarTurnoAceptar(this.turno.id)
       this.Toast.fire({
         icon: 'success',
         title: 'Turno Aceptado',
         color:'#80ED99',
       })
       this.ruta.navigateByUrl('homeEspecialista/miPerfil');
     })
   })
  }

}
