import { Component } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validar-especialista',
  templateUrl: './validar-especialista.component.html',
  styleUrls: ['./validar-especialista.component.css']
})
export class ValidarEspecialistaComponent {

  especialistas:Array<Especialista> = []
  especialistasNoHabilitados:Array<Especialista> = []
  especialistasHabilitados:Array<Especialista> = []

  constructor(private bd : BaseDatosService){
   this.bd.TraerUsuarioPorTipo('Especialista').subscribe((users:any)=>{
    this.especialistas = users as Array<Especialista>
    users.forEach((user:Especialista) => {
      if(user.cuentaHabilitada){
        this.especialistasHabilitados.push(user)
      }else{
        this.especialistasNoHabilitados.push(user)
      }
    });

    console.log(this.especialistas)
    console.log(this.especialistasHabilitados)
    console.log(this.especialistasNoHabilitados)
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

  Habilitar(especialista:Especialista){
    this.bd.ModificarCuentaHabilitada(especialista.id as string,true)
    this.Toast.fire({
      icon: 'success',
      title: 'Cuenta Habilitada',
      color:'#80ED99',
    })
  }

  Inhabilitar(especialista:Especialista){
    this.bd.ModificarCuentaHabilitada(especialista.id as string,false)
    this.Toast.fire({
      icon: 'error',
      title: 'Cuenta Inhabilitada',
      color:'#fb7474',
    })
  }

}
