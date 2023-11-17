import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeEspecialistaRoutingModule } from './home-especialista-routing.module';
import { HomeEspecialistaComponent } from './home-especialista.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EhistoriaClinicaComponent } from './componentes/ehistoria-clinica/ehistoria-clinica.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HomeEspecialistaComponent,
    TurnosComponent,
    EhistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    HomeEspecialistaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ]
})
export class HomeEspecialistaModule { }
