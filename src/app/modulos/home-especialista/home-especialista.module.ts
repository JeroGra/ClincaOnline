import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeEspecialistaRoutingModule } from './home-especialista-routing.module';
import { HomeEspecialistaComponent } from './home-especialista.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeEspecialistaComponent,
    TurnosComponent
  ],
  imports: [
    CommonModule,
    HomeEspecialistaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeEspecialistaModule { }
