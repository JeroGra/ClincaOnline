import { DatePipe } from '@angular/common';
import { AfterContentInit, Component } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { utils, writeFileXLSX } from 'xlsx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterContentInit {

  usuarios:Array<Paciente> = []
  especialistas:Array<Especialista> = []
  rows : Array<any> = []
  paciente = new Paciente
  datePipe = new DatePipe('en-Ar')
  constructor(private bd : BaseDatosService){}

  ngAfterContentInit(): void {
    this.bd.TraerUsuarioPorTipo('Paciente').subscribe((user:any)=>{
      this.usuarios = user;
    })

    this.bd.TraerUsuarioPorTipo('Especialista').subscribe((user:any)=>{
      this.especialistas = user;
    })
  }

  SelectUser(user:Paciente){
    this.paciente = user;
    let turnos : Array<Turno> = []

    for(let t of user.turnos){
      if(t.finalizado){
        turnos.push(t)
      }
    }

    turnos.forEach((t:Turno) => {
      for(let esp of this.especialistas){
        if(esp.id === t.uidEspe){
          let objT = {
            FechaTurno:`${t.anio}-${t.mes}-${t.dia} ${t.horarioInicio}`, 
            Estado:'Finalizado',
            Especialista:esp.nombre + " "+esp.apellido,
            Especialidad:t.especialidad,
            FechaFinalizado:this.datePipe.transform(t.diaDeFinalizacion,"yyyy/MM/dd : hh:mm")
          }
          this.rows.push(objT)
          break;
        }
      }
    });
    this.onSaveTurnos()
  }


  onSaveTurnos(): void {
    /* generate worksheet from state */
    const ws = utils.json_to_sheet(this.rows);
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    /* export to XLSX */
    writeFileXLSX(wb, this.paciente.id + "_turnos"+Date.now()+".xlsx");
  }

}
