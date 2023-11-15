import { DatePipe } from '@angular/common';
import { AfterContentInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent  implements AfterContentInit {

  especialidades:Array<any> = [];
  especialistas:Array<Especialista> = [];
  especialistasFiltro:Array<Especialista> = [];
  especialidadesFiltro:Array<any> = [];
  paciente = new Paciente

  fecha = Date.now();
  datePipe = new DatePipe('en-Ar')
  mes = this.datePipe.transform(this.fecha,'M')
  anio = this.datePipe.transform(this.fecha,'yyyy')
  horarios : Array<any> = []

  constructor(private bd : BaseDatosService, private ruta :Router,private log : LocalStorageEncriptService){
   
  }

  ngAfterContentInit() {
    let logObj = this.log.GetEncriptStorage()

    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.paciente = obj;
    })

    this.bd.TraerEspecialidades().subscribe((espe)=>{
      this.especialidades = espe as Array<any>
    })
    this.bd.TraerUsuarioPorTipo('Especialista').subscribe((esp)=>{
      this.especialistas = esp as Array<Especialista>
      this.SetEspecialistaVerify()
    })
  }

  selectEspecialista = true;
  selectEspecialidad = false;
  selectDiaHora = false;
  selectPaciente = false;
  especialdiad = "";
  especialista = new Especialista

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

  SelectEspecialdiad(esp:any){
    this.especialdiad = esp;
    this.selectEspecialidad = false;
    this.selectDiaHora = true;
  }

  SetEspecialistaVerify(){
    this.especialistasFiltro = []
    this.especialistas.forEach((esp:Especialista)=>{
  
        if(esp.cuentaHabilitada === true && esp.cuentaValidadaEmail === true){
              this.especialistasFiltro.push(esp);
        }
    })
  }

  setEspecialidadesEspecialista(){
    this.especialidadesFiltro = []
    for(let e of  this.especialista.especialidades){
      for(let x of this.especialidades){
        if(e == x.especialidad){
          this.especialidadesFiltro.push(x)
        }
      }
    }
  }

  SelectEspecialista(esp:Especialista){
    this.especialista = esp
    console.log(this.especialista)
    this.setEspecialidadesEspecialista()
    this.selectEspecialidad = true;
    setTimeout(()=>{
      this.selectEspecialista = false;
    },500)
    this.SetHorariosTurnos()
  }

  SetHorariosTurnos(){
    this.horarios = []
    let diasMes = new Date(parseInt(this.anio as string),parseInt(this.mes as string),0).getDate()
    let fechas = []

    for(let x = 1; x <= diasMes; x++){
      fechas.push(new Date(parseInt(this.anio as string),parseInt(this.mes as string)-1,x))
    }

    let dx = 0;
    let dy = 0;
    let objTurno = {
      dia:'',
      hora:0
    }

    if(this.especialista.horarios.lunes.inicio !== null){
      dx = parseInt(this.especialista.horarios.lunes.inicio);
      dy = parseInt(this.especialista.horarios.lunes.fin);
      objTurno.dia = "Monday";
      this.SetHoras(dx,dy,fechas,objTurno, this.horarios)
    }

    if(this.especialista.horarios.martes.inicio !== null){
      dx = parseInt(this.especialista.horarios.martes.inicio);
      dy = parseInt(this.especialista.horarios.martes.fin);
      objTurno.dia = "Tuesday";
      this.SetHoras(dx,dy,fechas,objTurno, this.horarios)
    }

    if(this.especialista.horarios.miercoles.inicio !== null){
      dx = parseInt(this.especialista.horarios.miercoles.inicio);
      dy = parseInt(this.especialista.horarios.miercoles.fin);
      objTurno.dia = "Wednesday";
      this.SetHoras(dx,dy,fechas,objTurno, this.horarios)
    }

    if(this.especialista.horarios.jueves.inicio !== null){
      dx = parseInt(this.especialista.horarios.jueves.inicio);
      dy = parseInt(this.especialista.horarios.jueves.fin);
      objTurno.dia = "Thursday";
      this.SetHoras(dx,dy,fechas,objTurno, this.horarios)
    }

    if(this.especialista.horarios.viernes.inicio !== null){
      dx = parseInt(this.especialista.horarios.viernes.inicio);
      dy = parseInt(this.especialista.horarios.viernes.fin);
      objTurno.dia = "Friday";
      this.SetHoras(dx,dy,fechas,objTurno, this.horarios)
    }

    if(this.especialista.horarios.sabado.inicio !== null){
      dx = parseInt(this.especialista.horarios.sabado.inicio);
      dy = parseInt(this.especialista.horarios.sabado.fin);
      objTurno.dia = "Saturday";
      this.SetHoras(dx,dy,fechas,objTurno, this.horarios)
    }
  }

  SetHoras(dx:number,dy:number,fechas:Array<any>,objTurno:any,horarios:Array<any>){
    for(;dx <= dy;dx++){
      for(let f of fechas){
        if(this.datePipe.transform(f,"EEEE") === objTurno.dia){
          let objH = {
            fecha:f,
            hora:''
          }
          if(dx >= 12){
            if(dx == 12){objH.hora = 12 + ":00 PM"}
            if(dx == 13){objH.hora = 1 + ":00 PM"}
            if(dx == 14){objH.hora = 2 + ":00 PM"}
            if(dx == 15){objH.hora = 3 + ":00 PM"}
            if(dx == 16){objH.hora = 4 + ":00 PM"}
            if(dx == 17){objH.hora = 5 + ":00 PM"}
            if(dx == 18){objH.hora = 6 + ":00 PM"}
            if(dx == 19){objH.hora = 7 + ":00 PM"}
            if(dx == 20){objH.hora = 8 + ":00 PM"}
            if(dx == 21){objH.hora = 9 + ":00 PM"}
            if(dx == 22){objH.hora = 10 + ":00 PM"}
            if(dx == 23){objH.hora = 11 + ":00 PM"}
          }else{
            if(dx == 0){objH.hora = 12 + ":00 AM"}else{objH.hora = dx + ":00 AM"}
          }
            horarios.push(objH)
        }
      }
    }

    if(this.especialista.turnos.length > 0){
      for(let t of this.especialista.turnos){
        for(let h of horarios)
        if(t.anio == this.datePipe.transform(h.fecha,"yyyy")){
          if(t.mes == this.datePipe.transform(h.fecha,"MM")){
              if(t.dia == this.datePipe.transform(h.fecha,"dd") && t.horarioInicio == h.hora){
                if(!t.cancelado){
                  this.horarios = this.horarios.filter((i) => i !== h);
                  break;
                }
              }
          }
        }
      }
    }
  }

  AtrasEspecialidad(){
    this.selectEspecialista = true;
    this.selectEspecialidad = false;
  }

  AtrasDiaHoras(){
    this.selectEspecialidad = true;
    this.selectDiaHora = false;
  }

  GenerarTurno(fecha:any){
    let turno = new Turno

    turno.especialidad = this.especialdiad
    turno.especialista = this.especialista
    turno.horarioInicio = fecha.hora
    turno.paciente = this.paciente
    turno.anio = this.datePipe.transform(fecha.fecha,'yyyy') as string
    turno.mes = this.datePipe.transform(fecha.fecha,'MM') as string
    turno.dia = this.datePipe.transform(fecha.fecha,'dd') as string

    this.bd.AltaTurno(turno).then(()=>{
      turno.especialista = undefined;
      turno.paciente = undefined;
      this.paciente.turnos.push(JSON.parse(JSON.stringify(turno)))
      this.especialista.turnos.push(JSON.parse(JSON.stringify(turno)))
      this.bd.ModificarUsuarioTurno(this.especialista.id,this.especialista.turnos)
      this.bd.ModificarUsuarioTurno(this.paciente.id,this.paciente.turnos)
      this.Toast.fire({
        icon: 'success',
        title: 'Turno Solicitado',
        color:'#80ED99',
      })
      this.ruta.navigateByUrl('home/miPerfil');
    })
    .catch(()=>{
      this.Toast.fire({
        icon: 'error',
        title: 'Error al generar el turno, vuelve a intentarlo',
        color:'#fb7474',
      })
      this.ruta.navigateByUrl('home/miPerfil');
    })       
  }

}
