import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {

  constructor(private ruta : Router){}
  
  login(){
    this.ruta.navigateByUrl('bienvenido/login')
  }

  register(){
    this.ruta.navigateByUrl('bienvenido/register')
  }

}
