import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.css']
})
export class HomeAdministradorComponent {

  constructor (private ruta : Router){}

  logOut(){
    this.ruta.navigateByUrl('bienvenido/bienvenida')
  }

}
