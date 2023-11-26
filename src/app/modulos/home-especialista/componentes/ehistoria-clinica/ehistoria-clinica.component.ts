import { AfterContentInit, Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
export class EhistoriaClinicaComponent implements AfterContentInit {

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

  constructor(private bd : BaseDatosService, private log : LocalStorageEncriptService,private spinner: NgxSpinnerService){
  }

  ngAfterContentInit() {
    this.spinner.show();
    let logObj = this.log.GetEncriptStorage()
    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.especialista = obj;
      this.TraerTurnosEspId()
      this.bd.TraerUsuarioPorTipo('Paciente').subscribe((pa)=>{
        this.pacientes = pa as Array<Paciente>
        let arr : Array<any> = []
        let equal = false;
        for(let turno of this.turnos){
          for(let pa of  this.pacientes){
            if(pa.id === turno.paciente?.id && turno.finalizado === true){
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
    })
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
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

  TraerTurnosEspId(){
    this.bd.TraerTurnosPorIdUsuario(this.especialista.id as string,"Especialista").subscribe((t:any)=>{
        this.turnos = t
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



}
