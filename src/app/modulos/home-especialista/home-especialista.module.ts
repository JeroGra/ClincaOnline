import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeEspecialistaRoutingModule } from './home-especialista-routing.module';
import { HomeEspecialistaComponent } from './home-especialista.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';


@NgModule({
  declarations: [
    HomeEspecialistaComponent,
    TurnosComponent
  ],
  imports: [
    CommonModule,
    HomeEspecialistaRoutingModule
  ]
})
export class HomeEspecialistaModule { }
