import { Component } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phistoria-clinica',
  templateUrl: './phistoria-clinica.component.html',
  styleUrls: ['./phistoria-clinica.component.css']
})
export class PhistoriaClinicaComponent {

  pacientes:Array<Paciente> = [];
  paciente = new Paciente
  historiaClinica = new HistoriaClinica
  especialista = new Especialista
  turnos : Array<Turno> = []
  historiaClinicaPaciente : Array<HistoriaClinica> = []
  verHistoria = false;


  constructor(private bd : BaseDatosService, private log : LocalStorageEncriptService){

    let logObj = this.log.GetEncriptStorage()

    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.paciente = obj;
      this.TraerHistoriaClinicaPaciente()
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

  SelectHistoria(hc:HistoriaClinica){
    this.historiaClinica = hc;
    this.TraerEspecialistaHistoriaClinica()
    this.verHistoria = true;
  }

  TraerEspecialistaHistoriaClinica(){
    this.bd.TraerUsuarioPorId(this.historiaClinica.idEspecialista as string).then((obj:any)=>{
      this.especialista = obj;
    })

  }


}
