import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private ruta : Router, private encriptService : LocalStorageEncriptService){
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
      let user = {
        id:"adasada123sa",
        email:"prueba@gmail.com",
        contrasenia:"sdws123",
      }

      let contra = "s123";

      this.encriptService.EncriptStorage(user);
      let rtC = this.encriptService.EncriptValue(contra);

      console.log(rtC);

    let rtLocal = this.encriptService.GetEncriptStorage()
    console.log(rtLocal);
    let rtCd = this.encriptService.DecriptValue(rtC);
    console.log(rtCd)
  }

}
