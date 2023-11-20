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
import { HistoriaClinica } from 'src/app/clases/historia-clinica';

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
  historiaClinica = new HistoriaClinica
  historiasCli : Array<HistoriaClinica> = []

 // turnosParaAceparRechazar:Array<Turno> = [];
 // turnosParaCancelarFinalizar:Array<Turno> = [];

  turnosFiltro:Array<Turno> = [];

  constructor(private bd : BaseDatosService, private ruta :Router, private log : LocalStorageEncriptService,private spinner: NgxSpinnerService){
  }
  
  ngAfterContentInit() {

    this.spinner.show();

    let logObj = this.log.GetEncriptStorage()

    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.especialista = obj;
      this.TraerTurnosEspId()
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
        console.log("mis especialidades")
        console.log(this.especialidades)
      })
      this.bd.TraerUsuarioPorTipo('Paciente').subscribe((pa)=>{
        this.pacientes = pa as Array<Paciente>
        let arr : Array<any> = []
        let equal = false;
        for(let turno of this.turnos){
          for(let pa of  this.pacientes){
            if(pa.id === turno.paciente?.id && turno.cancelado !== true){
              if(arr.length > 0){
                equal = false 
                for(let p of  arr){
                  if(p.id === pa.id){
                   // arr.push(pa)
                    equal = true;
                    break;
                  }
                }

                if(!equal){
                  arr.push(pa)
                }

              }else{
                arr.push(pa)
              }
            }
          }
        }
        this.pacientes = arr;
        console.log("Mis pacientes")
        console.log(this.pacientes)
      })
      this.bd.TraerHistoriasClinicas().subscribe((hc:any)=>{
        this.historiasCli = hc
      })
    })

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);

  }

  TraerTurnosEspId(){
    this.bd.TraerTurnosPorIdUsuario(this.especialista.id as string,"Especialista").subscribe((t:any)=>{
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
  selectPaciente = false;
  selectFiltro = false;
  
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

  fechaInicial:any
  fechaFinal:any
  horaInicio = "08:00"
  horaFin = "22:00"
  datePipe = new DatePipe('en-Ar')

  altura = 0;
  peso = 0;
  temperatura = 0;
  presion = 0;
  clave = "";
  valor = 0;
  claves = ['Huesos Rotos','Lesiones Musculares','Organos Dañados','Nada']

  altMin = 140;
  altMax = 200;
  peMin = 25;
  peMax = 100;
  tempMin = 37;
  tempMax = 45;
  presMin = 80;
  presMax = 180;

  ChangeToSelectPaciente(){
    this.selectTurnos = false;
    this.selectEspecialidad = false;
    this.selectPaciente= true;
    this.selectFiltro = false;
  }

  ChangeToSelectEspecialdiad(){
    this.selectTurnos = false;
    this.selectEspecialidad = true;
    this.selectPaciente = false;
    this.selectFiltro = false;
  }

  ChangeToSelectTurno(){
    this.selectTurnos = true;
    this.selectEspecialidad = false;
    this.selectPaciente = false;
    this.selectFiltro = false;
  }

  ChangeToSelectFiltro(){
    this.selectTurnos = false;
    this.selectEspecialidad = false;
    this.selectPaciente = false;
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
    this.ChangeToSelectTurno()
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
    this.ChangeToSelectTurno()
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

  FiltroHistoriaCli(filtro : 'Altura' | 'Peso' | 'Temp' | 'Presion' | 'Todos'){
    if(this.ValidarDatosHisCli()){

      let turnosId :Array<string> = []

      this.turnos = this.turnosFijosBd

      this.historiasCli.forEach((hc:any)=>{

        if(filtro === 'Altura'){
          if(hc.altura >= this.altMin && hc.altura <= this.altMax){
            turnosId.push(hc.idTurno as string)
          }
        }

        if(filtro === 'Peso'){

          if(hc.peso >= this.peMin && hc.peso <= this.peMax){
            turnosId.push(hc.idTurno as string)
          }
        }


        if(filtro === 'Temp'){

          if(hc.temperatura >= this.tempMin && hc.temperatura <= this.tempMin){
            turnosId.push(hc.idTurno as string)
          }
        }

        if(filtro === 'Presion'){

          if(hc.presion >= this.presMin && hc.presion <= this.presMax){
            turnosId.push(hc.idTurno as string)
          }
        }

        if(filtro === 'Todos'){

          if(hc.altura >= this.altMin && hc.altura <= this.altMax){
            if(hc.peso >= this.peMin && hc.peso <= this.peMax){
              if(hc.temperatura >= this.tempMin && hc.temperatura <= this.tempMin){
                if(hc.presion >= this.presMin && hc.presion <= this.presMax){
                  turnosId.push(hc.idTurno as string)
                }
              }
            }
          }
        }
      })

      let newTurnos : Array<Turno> = []
      
      if(turnosId.length > 0){
        turnosId.forEach((tId:string)=>{
          for(let turno of this.turnos){
            if(turno.id === tId){
              newTurnos.push(turno)
            }
          }
        })

        this.turnos = newTurnos;

      }else{
        this.turnos = []
        this.Toast.fire({
          icon: 'error',
          title: 'No se encontraron turnos con dichas caracteristicas',
          color:'#fb7474',
        })
      }

      this.selectFiltro = false;
      this.selectTurnos = true;

    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'Porfavor coloque datos validos de busqueda',
        color:'#fb7474',
      })
    }
  }

  ValidarDatosHisCli(){
    let ok = true;

    if(!(this.altMin > 0 && this.altMin < 400)){ok = false}
    if(!(this.altMax > 0 && this.altMax < 400)){ok = false}
    if(!(this.peMin > 0 && this.peMin < 400)){ok = false}
    if(!(this.peMax > 0 && this.peMax < 400)){ok = false}
    if(!(this.tempMin > 30 && this.tempMin < 55)){ok = false}
    if(!(this.tempMax > 30 && this.tempMax < 55)){ok = false}
    if(!(this.presMin > 40 && this.presMin < 200)){ok = false}
    if(!(this.presMax > 40 && this.presMax < 200)){ok = false}

    return ok
  }

  Reset(){
    this.turnos = this.turnosFijosBd;
    this.OpcionesFalse();
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
  

  SelectTurno(turno:Turno,accion : "Rechazar" | "Cancelar" | "Resenia" | "Finalizar"){
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
    
    if(accion === "Rechazar"){this.rechazar = true, this.cancelar = false, this.finalizar = false, this.resenia = false}
    if(accion === "Cancelar"){this.cancelar = true, this.rechazar = false, this.finalizar = false, this.resenia = false}
    if(accion === "Finalizar"){this.finalizar = true, this.cancelar = false, this.rechazar = false, this.resenia = false}
    if(accion === "Resenia"){this.resenia = true, this.cancelar = false, this.finalizar = false, this.rechazar = false}
  }


  CancerlarTurno(){

    if(this.motivo.length >= 25){


      this.bd.TraerUsuarioPorId( this.turno.especialista?.id as string).then((esp:any)=>{
         esp.turnos.forEach((t:Turno)=>{
          if(t.mes == this.turno.mes && this.turno.dia == t.dia)
          {
            t.cancelado = true;
            t.diaDeCancelacion = Date.now();
            if(this.rechazar){
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
              if(this.rechazar){
                t.motivoCancelado = "Rechazado: "+ this.motivo;
              }else{
                t.motivoCancelado = this.motivo;
              }
              t.id = this.turno.id
            }
          })
          this.bd.ModificarUsuarioTurno(this.turno.paciente?.id as string, pa.turnos as Array<any>);
          if(this.rechazar){
            this.bd.ModificarTurnoCancelado(this.turno.id, "Rechazado: "+this.motivo)
          }else{
            this.bd.ModificarTurnoCancelado(this.turno.id,this.motivo)
          }  
          
          this.Toast.fire({
            icon: 'success',
            title: 'Turno Cancelado/Rechazado',
            color:'#80ED99',
          })
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

  FinalizarTurno(){
    if(this.motivo.length >= 25){
        if(this.EvaluarHC()){

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
    
              this.historiaClinica.altura = this.altura;
              this.historiaClinica.peso = this.peso;
              this.historiaClinica.temperatura = this.temperatura;
              this.historiaClinica.presion = this.presion;
              this.historiaClinica.diagnostico.clave = this.clave;
              this.historiaClinica.diagnostico.valor = this.valor;
              this.historiaClinica.idEspecialista = this.turno.especialista?.id as string;
              this.historiaClinica.idPaciente = this.turno.paciente?.id as string;
              this.historiaClinica.idTurno = this.turno.id as string;
              this.historiaClinica.turno = this.turno.anio + "-" + this.turno.mes + "-" + this.turno.dia + " " + this.turno.horarioInicio 
    
              this.bd.AltaHistoriaClinica(this.historiaClinica).then(()=>{
    
                this.Toast.fire({
                  icon: 'success',
                  title: 'Turno Finalizado! Historia CLinica Subida!!',
                  color:'#80ED99',
                })
                this.altura = 0;
                this.peso = 0;
                this.temperatura = 0;
                this.presion = 0;
                this.clave = "";
                this.valor = 0;
                this.Reset();
              })
            })
          })
        }
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

  SetClave(clave:string){
    this.clave = clave;
    this.valor = 1;
  }

  EvaluarHC(){
    let pass = false;
    if(!(this.altura < 100 || this.altura > 300)){
      if(!(this.peso < 1 || this.peso > 300)){
        if(!(this.temperatura < 20 || this.temperatura > 50)){
          if(!(this.presion < 50 || this.presion > 200)){
            if(this.clave !== ""){
              if(this.valor > 0 ){

                pass = true;
  
              }else{
                this.Toast.fire({
                  icon: 'error',
                  title: 'Coloque un valor minimo (1) del diagnostico',
                  color:'#fb7474',
                })
              }
            }else{
              this.Toast.fire({
                icon: 'error',
                title: 'Seleccione una clave del diagnostico',
                color:'#fb7474',
              })
            }
          }else{
            this.Toast.fire({
              icon: 'error',
              title: 'Coloque una Presión arterial sistólica valida',
              color:'#fb7474',
            })
          }
        }else{
          this.Toast.fire({
            icon: 'error',
            title: 'Coloque una temperatura valida en grados C°',
            color:'#fb7474',
          })
        }
      }else{
        this.Toast.fire({
          icon: 'error',
          title: 'Coloque un peso valido en k',
          color:'#fb7474',
        })
      }
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'Coloque una altura valida en cm',
        color:'#fb7474',
      })
    }

    return pass

  }


  AceptarTurno(t:Turno){

    this.turno = t

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
       this.Reset()
     })
   })
  }

}
