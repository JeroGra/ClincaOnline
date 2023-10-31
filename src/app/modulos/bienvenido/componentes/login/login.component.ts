import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuariosBd:Array<Usuario>  = []

  constructor(private ruta : Router, private encriptService : LocalStorageEncriptService, private bd : BaseDatosService){

    this.bd.TraerUsuarios().subscribe((users:any)=>{
      this.usuariosBd = users as Array<Usuario>
    })
  }

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
  }

  paciente(){
    this.email = "paciente@gmail.com"
  }

  LogIn()
  {
      this.usuariosBd.forEach((user:Usuario)=>{

        let pass = this.encriptService.DecriptValue(user.contrasenia)
        console.log(user);
        console.log(pass)
      })
  }

}
