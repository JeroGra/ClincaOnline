import { AfterContentInit, Component } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';

@Component({
  selector: 'app-ahistoria-clinica',
  templateUrl: './ahistoria-clinica.component.html',
  styleUrls: ['./ahistoria-clinica.component.css']
})
export class AhistoriaClinicaComponent implements AfterContentInit {

  especialistas:Array<Especialista> = [];
  pacientes:Array<Paciente> = [];
  paciente = new Paciente
  historiaClinica = new HistoriaClinica
  especialista = new Especialista
  turnos : Array<Turno> = []
  historiaClinicaPaciente : Array<HistoriaClinica> = []
  selectEspecialista = true;
  selectPaciente = false;
  mostrarH = false;
  verHistoria = false;


  constructor(private bd : BaseDatosService, private log : LocalStorageEncriptService){



  }

  TraerPacientesEsp(){
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
      console.log(this.pacientes)
    })
  }

  TraerTurnosEspId()
  {
    this.bd.TraerTurnosPorIdUsuario(this.especialista.id as string,"Especialista").subscribe((t:any)=>{
      this.turnos = t
  })
  }
  
  ngAfterContentInit() {

    let logObj = this.log.GetEncriptStorage()


    this.bd.TraerUsuarioPorTipo("Especialista").subscribe((obj:any)=>{
      this.especialistas = obj;
    })

  }

  TraerHistoriaClinicaPaciente(){
    this.historiaClinicaPaciente = []
    this.bd.TraerHistoriasClinicasPorIdUsuario(this.paciente.id as string,"Paciente").subscribe((hc)=>{
      this.historiaClinicaPaciente = hc as Array<HistoriaClinica>
    })
  }

  SelectEspecialista(esp:Especialista){
    this.especialista = esp
    this.selectEspecialista = false;
    this.TraerPacientesEsp()
    console.log(this.historiaClinicaPaciente)
    this.selectPaciente = true;
  }

  SelectPaciente(pa:Paciente){
    this.paciente = pa
    this.TraerHistoriaClinicaPaciente()
    console.log(this.historiaClinicaPaciente)
    this.selectPaciente = false;
    this.mostrarH = true;
  }

  SelectHistoria(hc:HistoriaClinica){
    this.historiaClinica = hc;
    this.verHistoria = true;
  }

  AtrasH(){
    this.selectPaciente = true;
    this.mostrarH = false;
  }


}
