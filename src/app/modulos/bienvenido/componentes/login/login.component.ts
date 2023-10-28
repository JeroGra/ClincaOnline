import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private ruta : Router){}

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

}
