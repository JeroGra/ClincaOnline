import { AfterContentInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements AfterContentInit {


  especialidades:Array<any> = [];
  especialistas:Array<Especialista> = [];
  turnos:Array<Turno> = [];
  turnosFijosBd:Array<Turno> = [];

  constructor(private bd : BaseDatosService, private ruta :Router,private spinner: NgxSpinnerService){
  
  }
  ngAfterContentInit() {
    
    this.spinner.show();

    this.bd.TraerEspecialidades().subscribe((esp)=>{
      this.especialidades = esp as Array<any>
    })
    this.bd.TraerUsuarioPorTipo('Especialista').subscribe((esp)=>{
      this.especialistas = esp as Array<Especialista>
    })
    this.bd.TraerTurnos().subscribe((turnos)=>{
      this.turnos = turnos;
      this.turnosFijosBd = turnos;
    })

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);

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
  selectEspecialista = false;


  cancelar= false;
  turno:Turno = new Turno;
  fotoEsp:any = "";
  espNombreApellido = "";
  fotoPa:any = "";
  paNombreApellido = "";

  motivo = ""



  ChangeToSelectEspecialista(){
    this.selectTurnos = false;
    this.selectEspecialidad = false;
    this.selectEspecialista = true;
  }

  ChangeToSelectEspecialdiad(){
    this.selectTurnos = false;
    this.selectEspecialidad = true;
    this.selectEspecialista = false;
  }

  ChangeToSelectTurno(){
    this.selectTurnos = true;
    this.selectEspecialidad = false;
    this.selectEspecialista = false;
  }

  Reset(){
    this.turnos = this.turnosFijosBd;
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
    this.ChangeToSelectTurno();
  }

  SelectEspecialista(esp:Especialista){
    this.bd.TraerTurnosPorIdUsuario(esp.id as string,"Especialista").subscribe((t)=>{
      this.turnos = t;
    })
    this.ChangeToSelectTurno();
  }

  SelectTurno(turno:Turno){
    this.turno = turno
    this.espNombreApellido = turno.especialista?.nombre +" "+turno.especialista?.apellido;
    this.paNombreApellido = turno.paciente?.nombre +" "+turno.paciente?.apellido;
    this.turno.especialista?.fotos.forEach((foto:any)=>{
      this.fotoEsp = foto.path as string
    })
    let x = true;
    this.turno.paciente?.fotos.forEach((foto:any)=>{
      if(x)
      {
        this.fotoPa = foto.path as string
        x = false
      }
    })

    this.cancelar = true
  }

  CancerlarTurno(){

    if(this.motivo.length >= 25){


      this.bd.TraerUsuarioPorId( this.turno.especialista?.id as string).then((esp:any)=>{
         esp.turnos.forEach((t:Turno)=>{
          if(t.mes == this.turno.mes && this.turno.dia == t.dia)
          {
            t.cancelado = true;
            t.diaDeCancelacion = Date.now();
            t.motivoCancelado = this.motivo;
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
              t.motivoCancelado = this.motivo;
              t.id = this.turno.id
            }
          })
          this.bd.ModificarUsuarioTurno(this.turno.paciente?.id as string, pa.turnos as Array<any>);  
          this.bd.ModificarTurnoCancelado(this.turno.id,this.motivo)
          this.Toast.fire({
            icon: 'success',
            title: 'Turno Cancelado',
            color:'#80ED99',
          })
          this.ruta.navigateByUrl('homeAdministrador/miPerfil');
        })
      })
     }else{
      if(this.motivo = ""){
        this.Toast.fire({
          icon: 'error',
          title: 'Porfavor detalle el motivo de cancelacion',
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

}
