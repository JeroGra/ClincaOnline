import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-especialista',
  templateUrl: './home-especialista.component.html',
  styleUrls: ['./home-especialista.component.css']
})
export class HomeEspecialistaComponent {
  
  constructor (private ruta : Router){}

  logOut(){
    this.ruta.navigateByUrl('bienvenido/bienvenida')
  }
}
