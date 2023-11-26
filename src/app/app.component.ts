import { Component } from '@angular/core';
import { outAnimation, slideInAnimation } from './animations';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[outAnimation]
})
export class AppComponent {
  title = 'ClinicaOnline';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
