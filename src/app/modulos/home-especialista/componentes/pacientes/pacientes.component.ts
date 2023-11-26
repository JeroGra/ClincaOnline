import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements AfterContentInit {

  pacientes:Array<Paciente> = [];
  paciente = new Paciente;
  especialista = new Especialista;
  turnos : Array<Turno> = [];
  turnosFijos : Array<Turno> = [];
  turno = new Turno;

  constructor(private bd : BaseDatosService, private log : LocalStorageEncriptService){}

  ngAfterContentInit(): void {
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
  }

  TraerTurnosEspId(){
    this.bd.TraerTurnosPorIdUsuario(this.especialista.id as string,"Especialista").subscribe((t:any)=>{
        this.turnos = t;
        this.turnosFijos = t;
    })
  }

  SelectPaciente(pa:Paciente){
    if(pa.id === this.paciente.id){
      this.paciente = new Paciente
      this.turnos = this.turnosFijos;
    }else{
      this.paciente = pa
      this.turnos = this.turnosFijos;
      let tu : Array<Turno> = []
      for(let t of pa.turnos){
        for(let turno of this.turnos){
            if(t.id === turno.id){
              tu.push(turno);
            }
        }
      }
      this.turnos = tu;
    }
  }

  SelectTurno(t:Turno){
    if(this.turno.id === undefined){
      this.turno = t;
    }else{
      if(t.id !== this.turno.id){
        this.turno = t;
      }else{
        this.turno = new Turno;
      }
    }
  }

}
