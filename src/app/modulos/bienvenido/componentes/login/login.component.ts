import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private ruta : Router, private encriptService : LocalStorageEncriptService, private bd : BaseDatosService){
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

  usuarios = false;
  email:string = "";
  contrasenia:string = "";

  bienvenida(){
    this.ruta.navigateByUrl("bienvenido/bienvenida")
  }

  register(){
    this.ruta.navigateByUrl('bienvenido/register')
  }

  desplegarUsiarios(){
    if(this.usuarios){ this.usuarios = false; this.email = ""; this.contrasenia = "" }else{ this.usuarios = true }
  }

  admin(){
    this.email = "admin@gmail.com"
  }

  especialista(){
    this.email = "especialista@gmail.com"
    this.contrasenia = "especialista123"
  }

  paciente(){
    this.email = "paciente@gmail.com"
    this.contrasenia = "paciente123"
  }

  LogIn()
  {
    /*  this.usuariosBd.forEach((user:Usuario)=>{
        let pass = this.encriptService.DecriptValue(user.contrasenia)
        console.log(user);
        console.log(pass)
      })*/
      if(this.email !== "" && this.contrasenia !== ""){
          this.bd.TraerUsuarioPorEmail(this.email).then((obj:any)=>{
            let usuario = new Usuario
            usuario = obj as Usuario
            if(usuario.email === this.email){
              let contrasenia = this.encriptService.DecriptValue(usuario.contrasenia)
              if(contrasenia === this.contrasenia){
    
                let rt = this.TipoUsuarioValidacion(obj);
                if(rt.valido)
                {
                  this.Toast.fire({
                    icon: 'success',
                    title: rt.mensaje,
                    color:'#80ED99',
                  })

                  this.ruta.navigateByUrl('home');

                }else{
                  this.Toast.fire({
                    icon: 'error',
                    title: rt.mensaje,
                    color:'#fb7474',
                  })

                }

              }else{
                this.Toast.fire({
                  icon: 'warning',
                  title: 'Contraseña Invalida',
                  color:'#fb7474',
                })
              }
            }
          }).catch((error)=>{
            console.log(error)
            this.Toast.fire({
              icon: 'error',
              title: 'Usuario Inexistente',
              color:'#fb7474',
            })
          })
      }else{
        this.Toast.fire({
          icon: 'error',
          title: 'Porfavor complete todos los campos',
          color:'#fb7474',
        })
      }
  }

  TipoUsuarioValidacion(usuario:any){

    let rt = {
      usuario:usuario,
      mailValido:false,
      cuentaHabilitada:false,
      valido:false,
      mensaje:""
    }

    switch(usuario.tipo){
      case "Especialista":
        let especialista = usuario as Especialista;
        rt.usuario = especialista;
        if(especialista.cuentaValidadaEmail){
          rt.mailValido = true;
          if(especialista.cuentaHabilitada){
            rt.cuentaHabilitada = true;
            rt.valido =  rt.cuentaHabilitada &&  rt.mailValido;
            rt.mensaje = "Bienvenido/a "+especialista.nombre+" "+especialista.apellido;
            return rt;
          }else{
            rt.mensaje = "Esta cuenta aun no fue Habilitada por un Administrador";
            return rt;
          }
        }else{
          rt.mensaje = "Esta cuenta no fue verificada por mail";
          return rt;
        }
      break;
      case "Paciente":
        let paciente = usuario as Paciente;
        rt.usuario = paciente;
        if(paciente.cuentaValidadaEmail){
          rt.mailValido = true;
          rt.valido = rt.mailValido;
          rt.mensaje = "Bienvenido/a "+paciente.nombre+" "+paciente.apellido;
          return rt;
        }else{
          rt.mensaje = "Esta cuenta no fue verificada por mail";
          return rt;
        }
      break;
      case "Administrador":
        let administrador = usuario as Administrador
        rt.cuentaHabilitada = true;
        rt.mailValido = true;
        rt.valido = true;
        rt.usuario = administrador;
        rt.mensaje = "Bienvenido/a "+administrador.nombre+" "+administrador.apellido;
        return rt
      break;
      default:
        return rt
      break;
    }
  }

}
