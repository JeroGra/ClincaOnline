import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-home-especialista',
  templateUrl: './home-especialista.component.html',
  styleUrls: ['./home-especialista.component.css'],
  animations: [ slideInAnimation]
})
export class HomeEspecialistaComponent {
  
  constructor (private ruta : Router){}

  logOut(){
    this.ruta.navigateByUrl('bienvenido/bienvenida')
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
