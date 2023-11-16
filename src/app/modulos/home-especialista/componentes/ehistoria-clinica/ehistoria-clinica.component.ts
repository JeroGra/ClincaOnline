import { Component } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ehistoria-clinica',
  templateUrl: './ehistoria-clinica.component.html',
  styleUrls: ['./ehistoria-clinica.component.css']
})
export class EhistoriaClinicaComponent {

  pacientes:Array<Paciente> = [];
  paciente = new Paciente
  historiaClinica = new HistoriaClinica
  especialista = new Especialista
  turnos : Array<Turno> = []
  historiaClinicaPaciente : Array<HistoriaClinica> = []
  selectPaciente = true;
  agregarH = false;
  verHistoria = false;
  verHistorias = true;
  altura = 0;
  peso = 0;
  temperatura = 0;
  presion = 0;
  clave = "";
  valor = 0;
  claves = ['Huesos Rotos','Lesiones Musculares','Organos Dañados','Nada']

  constructor(private bd : BaseDatosService, private log : LocalStorageEncriptService){

    let logObj = this.log.GetEncriptStorage()


    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.especialista = obj;
    })

    this.bd.TraerTurnos().subscribe((turnos)=>{
      let arr : Array<Turno> = turnos;
      for(let t of this.especialista.turnos){
        for(let turno of  arr){
          if(turno.id === t.id){
           this.turnos.push(turno);
            break;
          }
        }
      }
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

  TraerHistoriaClinicaPaciente(){
    this.historiaClinicaPaciente = []
    this.bd.TraerHistoriasClinicasPorIdUsuario(this.paciente.id as string,"Paciente").subscribe((hc)=>{
      this.historiaClinicaPaciente = hc as Array<HistoriaClinica>
    })
  }

  SelectPaciente(pa:Paciente){
    this.paciente = pa
    this.TraerHistoriaClinicaPaciente()
    console.log(this.historiaClinicaPaciente)
    this.selectPaciente = false;
  }

  SelectHistoria(hc:HistoriaClinica){
    this.historiaClinica = hc;
    this.verHistoria = true;
  }

  AgregarHC(){
    this.verHistoria = false
    this.verHistorias = false;
    this.agregarH = true
  }

  SetClave(clave:string){
    this.clave = clave;
    this.valor = 1;
  }

  SubirHC(){
    if(!(this.altura < 100 || this.altura > 300)){
      if(!(this.peso < 1 || this.peso > 300)){
        if(!(this.temperatura < 20 || this.temperatura > 50)){
          if(!(this.presion < 50 || this.presion > 200)){
            if(this.clave !== ""){
              if(this.valor > 0 ){

                this.historiaClinica.altura = this.altura;
                this.historiaClinica.peso = this.peso;
                this.historiaClinica.temperatura = this.temperatura;
                this.historiaClinica.presion = this.presion;
                this.historiaClinica.diagnostico.clave = this.clave;
                this.historiaClinica.diagnostico.valor = this.valor;
                this.historiaClinica.idEspecialista = this.especialista.id as string;
                this.historiaClinica.idPaciente = this.paciente.id as string;

                this.bd.AltaHistoriaClinica(this.historiaClinica).then(()=>{

                  
                  this.TraerHistoriaClinicaPaciente()

                  this.Toast.fire({
                    icon: 'success',
                    title: 'historia CLinica Subida',
                    color:'#80ED99',
                  })
                  this.verHistorias = true;
                  this.agregarH = false;
                  this.altura = 0;
                  this.peso = 0;
                  this.temperatura = 0;
                  this.presion = 0;
                  this.clave = "";
                  this.valor = 0;
                })
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
  }

}
