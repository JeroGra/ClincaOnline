import { Component } from '@angular/core';
import { getAuth, sendEmailVerification } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private ruta : Router, private encriptService : LocalStorageEncriptService, private bd : BaseDatosService,
    private auth : AuthService){
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
  urlAdm = "https://firebasestorage.googleapis.com/v0/b/clinicaonline-a3637.appspot.com/o/imagenes%2Fusuarios%2F42489444_1?alt=media&token=c55b441e-805d-444e-bfd6-ad164b542bfa"
  urlEsp = "https://firebasestorage.googleapis.com/v0/b/clinicaonline-a3637.appspot.com/o/imagenes%2Fusuarios%2F22222222_1?alt=media&token=4a24ec93-23de-4ed3-af42-9e9596927b1e"
  urlEsp2 = "https://firebasestorage.googleapis.com/v0/b/clinicaonline-a3637.appspot.com/o/imagenes%2Fusuarios%2F40000000_1?alt=media&token=df3ddd0a-24a9-4681-a871-24abcabd5c9a"
  urlPa = "https://firebasestorage.googleapis.com/v0/b/clinicaonline-a3637.appspot.com/o/imagenes%2Fusuarios%2F11111111_1?alt=media&token=3eac7146-7ac8-4c31-ab31-6b55b2975e1c"
  urlPa2  = ""
  urlPa3 = ""

  private ToastCargaUser = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2500,
  })

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
    this.email = "Jerog000@gmail.com"
    this.contrasenia = "jero123"
  }

  especialista(){
    this.email = "especialista@gmail.com"
    this.contrasenia = "especialista123"
  }

  especialista2(){
    this.email = "maximus@gmail.com"
    this.contrasenia = "maximus123"
  }

  paciente(){
    this.email = "paciente@gmail.com"
    this.contrasenia = "paciente123"
  }

  paciente2(){
    this.email = "paciente@gmail.com"
    this.contrasenia = "paciente123"
  }
  paciente3(){
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

      this.ToastCargaUser.fire({
        toast : true,
        title:'',
        imageUrl:"../../../../../assets/imagenes/carga.gif",
        imageWidth: 200,
        imageHeight: 200,
        color: '#80ED99',
        background: '#22577A',
      })

      if(this.email !== "" && this.contrasenia !== ""){
      
        this.auth.Logear(this.email,this.contrasenia).then((userAuth)=>{
         
          this.bd.TraerUsuarioPorEmail(this.email).then((obj:any)=>{

            if(userAuth.user.emailVerified){
              this.bd.ModificarVerificacionUsuario(obj.id)
              obj.cuentaValidadaEmail = true;
            }
            
            if(obj.email === this.email){
              let contrasenia = this.encriptService.DecriptValue(obj.contrasenia)
              if(contrasenia === this.contrasenia){
    
                let rt = this.TipoUsuarioValidacion(obj);
                if(rt.valido)
                {
                  this.Toast.fire({
                    icon: 'success',
                    title: rt.mensaje,
                    color:'#80ED99',
                  })
                  this.encriptService.RemoveEncriptStorage();
                  this.encriptService.EncriptStorage(obj);
                  if(obj.tipo === "Especialista"){
                    this.ruta.navigateByUrl('homeEspecialista/miPerfil')
                  }else if(obj.tipo === "Paciente"){
                    this.ruta.navigateByUrl('home/miPerfil')
                  }else if(obj.tipo === "Administrador"){
                    this.ruta.navigateByUrl('homeAdministrador/miPerfil')
                  }
                }else{
                  this.Toast.fire({
                    icon: 'error',
                    title: rt.mensaje,
                    color:'#fb7474',
                  })
  
                  if(!rt.mailValido){
  
                    Swal.fire({
                      title: 'Email no verificado',
                      icon: 'info',
                      showConfirmButton:false,
                      background:'#22577A',
                      color:'white',
                      timer:1000,
                    }).then((result)=>{
                      let auth = getAuth()
                      if(auth.currentUser !== null){
                      sendEmailVerification(auth.currentUser).then(()=>{
                        this.Toast.fire({
                          icon: 'success',
                          title: 'Enviamos un email de verificación!! Revise su correo',
                          color:'#80ED99',
                        })
                         setTimeout(()=>{
                            this.encriptService.EncriptStorage(obj);
                            this.ruta.navigateByUrl('bienvenido/bienvenida');
                        },2500)
                      })
                    }
                    })
                  }
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
              title: 'Los datos no coinciden con usuarios registrados',
              color:'#fb7474',
            })
          })
        }).catch((error) => {
          console.log(error)
          this.Toast.fire({
            icon: 'error',
            title: 'Los datos no coinciden con usuarios registrados',
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
        rt.usuario = administrador;
        if(administrador.cuentaValidadaEmail){
          rt.mailValido = true;
          rt.valido = true;
          rt.mensaje = "Bienvenido/a "+administrador.nombre+" "+administrador.apellido;
          return rt
        }else{
          rt.mensaje = "Esta cuenta no fue verificada por mail";
          return rt;
        }
      break;
      default:
        return rt
      break;
    }
  }

}
