import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent {


  especialidades:Array<any> = [];
  especialistas:Array<Especialista> = [];
  especialistasFiltro:Array<Especialista> = [];
  especialidadesFiltro:Array<Especialista> = [];
  pacientes:Array<Paciente> = [];
  dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado']
  horarios = [
    {
      horaInicio:'9:00',
      horaFin:'10:00'
    },
    {
      horaInicio:'10:10',
      horaFin:'11:10'
    },
    {
      horaInicio:'11:20',
      horaFin:'12:20'
    },
    {
      horaInicio:'12:30',
      horaFin:'13:30'
    },
    {
      horaInicio:'14:00',
      horaFin:'15:00'
    },
    {
      horaInicio:'15:10',
      horaFin:'16:10'
    },
    {
      horaInicio:'16:20',
      horaFin:'17:20'
    },
    {
      horaInicio:'17:30',
      horaFin:'18:30'
    },
    {
      horaInicio:'18:40',
      horaFin:'19:40'
    },
]
  fecha = Date.now();
  datePipe = new DatePipe('en-Ar')
  mes = this.datePipe.transform(this.fecha,'M')
  anio = this.datePipe.transform(this.fecha,'yyyy')
  diasNumero : Array<any> = [];
  tomado = false;
  lleno = false;

  constructor(private bd : BaseDatosService, private ruta :Router){
    this.bd.TraerEspecialidades().subscribe((esp)=>{
      this.especialidades = esp as Array<any>
    })
    this.bd.TraerUsuarioPorTipo('Especialista').subscribe((esp)=>{
      this.especialistas = esp as Array<Especialista>
      this.SetEspecialistaVerify()
    })
    this.bd.TraerUsuarioPorTipo('Paciente').subscribe((pa)=>{
      let pacien = pa as Array<Paciente>
      pacien.forEach((pa:Paciente)=>{
        if(pa.cuentaValidadaEmail)
        {
          this.pacientes.push(pa)
        }
      })
    })

   

  }

  selectEspecialista = true;
  selectEspecialidad = false;
  selectDiaHora = false;
  selectPaciente = false;
  diaExactoD = true;
  horaSelect = true;
  dia = "";
  diaNum = "";
  horario = {
    horaInicio:'',
    horaFin:''
  }

  especialdiad = "";
  especialista = new Especialista
  paciente = new Paciente


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
    this.selectPaciente = true;
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
    this.especialista.especialidades.forEach((element:any) => {
      this.especialidadesFiltro.push(element)
    });
  }


  SelectEspecialista(esp:Especialista){
    this.especialista = esp
    console.log(this.especialista)
    this.setEspecialidadesEspecialista()
    this.selectEspecialidad = true;
    setTimeout(()=>{
      this.selectEspecialista = false;
    },500)
  }

  SelectPaciente(pa:Paciente){
    this.paciente = pa;
    this.selectDiaHora = true;
    setTimeout(()=>{
      this.selectPaciente = false;
    },500)
  }

  DiaSelect($event:any){


    let diasMes = new Date(parseInt(this.anio as string),parseInt(this.mes as string),0).getDate()
    let miDia = "";
    let mes = []
    let day = parseInt(this.datePipe.transform(Date.now(),'dd') as string)
    for(day;day <= diasMes; day++){
      mes.push(new Date(parseInt(this.anio as string),parseInt(this.mes as string)-1,day))
    }

    switch(this.dia){
      case'Lunes':
      miDia = "Monday";
      break;
      case'Martes':
      miDia = 'Tuesday';
      break;
      case'Miercoles':
      miDia = 'Wednesday';
      break;
      case'Jueves':
      miDia = 'Thursday';
      break;
      case'Viernes':
      miDia = 'Friday';
      break;
      case'Sabado':
      miDia = 'Saturday';
      break;
    }

    this.diasNumero = []

    mes.forEach(dia => {
      if(this.datePipe.transform(dia,'EEEE')=== miDia)
      {
        let diaMes = this.datePipe.transform(dia,'dd')
        this.diasNumero.push(diaMes)
      }
    });

    this.diaExactoD = false;
  }



  AtrasEspecialidad(){
    this.selectEspecialista = true;
    this.selectEspecialidad = false;
  }

  AtrasPaciente(){
    this.selectPaciente = false;
    this.selectEspecialidad = true;
  }

  AtrasDiaHoras(){
    this.selectPaciente = true;
    this.selectDiaHora = false;
  }

  DiaExactoSelect($event:any){
    this.horaSelect = false;
   // this.EvaluarTurnoDia();
  }

  SelectHorario(h:any){
    this.EvaluarTurnoHorario()
    console.log(h)
    this.horario = h
  }


  EvaluarTurnoHorario(){
    let tomado = false

    for(let turno of this.especialista.turnos){
      console.log(turno)
      if(turno.mes === this.mes && turno.dia === this.diaNum){
        console.log(turno.mes)
        console.log(turno.dia)
          if(turno.horarioInicio === this.horario.horaInicio)
          {
            if(!turno.cancelado)
            {
              console.log(turno.horarioInicio)
              tomado = true;
            }
            break;
          }
      }
    }
    console.log(tomado)
    if(tomado){this.tomado = true}

    return tomado
  }

  EvaluarTurnoDia(){
    let diaLleno = true
    for(let horario of this.horarios){

      for(let turno of this.especialista.turnos){
        console.log(turno)
        if(turno.mes === this.mes && turno.dia === this.diaNum){
          console.log(turno.mes)
          console.log(turno.dia)
            if(turno.horarioInicio !== horario.horaInicio)
            {
              if(turno.cancelado){
                console.log(turno.horarioInicio)
                diaLleno = false;
                break;
              }
            }
        }
      }

      if(!diaLleno){
        break;
      }
    }

    if(this.especialista.turnos.length === 0){diaLleno = false}

    console.log(diaLleno)
    if(diaLleno){this.lleno = true}else{this.lleno = false}

    return diaLleno
  }

  EvaluarPacienteTurno(){
    let tomado = false

    for(let turno of this.paciente.turnos){
      console.log(turno)
      if(turno.mes === this.mes && turno.dia === this.diaNum){
        console.log(turno.mes)
        console.log(turno.dia)
          if(turno.horarioInicio === this.horario.horaInicio)
          {
            console.log(turno.horarioInicio)
            tomado = true;
            break;
          }
      }
    }
    console.log(tomado)
    if(tomado){this.tomado = true}else{this.tomado = false}

    return tomado
  }

  GenerarTurno(){

    if(this.diaNum != ""){
      if(this.horario.horaInicio != ""){
        //!this.EvaluarTurnoDia()
        if(true){
          if(!this.EvaluarTurnoHorario()){
            if(!this.EvaluarPacienteTurno()){
              let turno = new Turno
              turno.dia = this.diaNum as string
              turno.especialidad = this.especialdiad
              turno.especialista = this.especialista
              turno.horarioInicio = this.horario.horaInicio as string
              turno.horarioFin = this.horario.horaFin as string
              turno.paciente = this.paciente
              turno.mes = this.mes as string
          


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
                this.ruta.navigateByUrl('homeAdministrador/miPerfil');
              })
              .catch(()=>{
                this.Toast.fire({
                  icon: 'error',
                  title: 'Error al generar el turno, vuelve a intentarlo',
                  color:'#fb7474',
                })
                this.ruta.navigateByUrl('homeAdministrador/miPerfil');
              })       
            }else{
              this.Toast.fire({
                icon: 'error',
                title: 'El turno ya fue solicitado por el Paciente',
                color:'#fb7474',
              })
            }
          }else{
            this.Toast.fire({
              icon: 'error',
              title: 'horario tomado',
              color:'#fb7474',
            })
          }
        }else{
          this.Toast.fire({
            icon: 'error',
            title: 'Dia con horarios tomados',
            color:'#fb7474',
          })
        }
      }else{
        this.Toast.fire({
          icon: 'error',
          title: 'Falta Seleccionar horario',
          color:'#fb7474',
        })
      }
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'Falta selecionar dia',
        color:'#fb7474',
      })
    }
  }

  TablaTurnos(){
    let inicio = 0;
    let fin = 0;
    switch(this.dia){
      case'Lunes':
        inicio = parseInt(this.especialista.horarios.lunes.inicio);
        fin = parseInt(this.especialista.horarios.lunes.fin);
      break;
      case'Martes':
      inicio = parseInt(this.especialista.horarios.martes.inicio);
      fin = parseInt(this.especialista.horarios.martes.fin);
      break;
      case'Miercoles':
      inicio = parseInt(this.especialista.horarios.miercoles.inicio);
      fin = parseInt(this.especialista.horarios.miercoles.fin);
      break;
      case'Jueves':
      inicio = parseInt(this.especialista.horarios.jueves.inicio);
      fin = parseInt(this.especialista.horarios.jueves.fin);
      break;
      case'Viernes':
      inicio = parseInt(this.especialista.horarios.viernes.inicio);
      fin = parseInt(this.especialista.horarios.viernes.fin);
      break;
      case'Sabado':
      inicio = parseInt(this.especialista.horarios.sabado.inicio);
      fin = parseInt(this.especialista.horarios.sabado.fin);
      break;
    }

    let arrHorarios = []

    for(;inicio <= fin;inicio++){
      let horarios = {
        inicio : inicio,
        fin : inicio + 0.8
      }
      arrHorarios.push(horarios)
    }

    console.log(arrHorarios)

  }

}
