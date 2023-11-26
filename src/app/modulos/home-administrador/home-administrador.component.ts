import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.css'],
  animations: [slideInAnimation]
})
export class HomeAdministradorComponent {

  constructor (private ruta : Router){}

  logOut(){
    this.ruta.navigateByUrl('bienvenido/bienvenida')
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
