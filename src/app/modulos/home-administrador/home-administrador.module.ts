import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAdministradorRoutingModule } from './home-administrador-routing.module';
import { HomeAdministradorComponent } from './home-administrador.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ValidarEspecialistaComponent } from './componentes/validar-especialista/validar-especialista.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';
import { AhistoriaClinicaComponent } from './componentes/ahistoria-clinica/ahistoria-clinica.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HomeAdministradorComponent,
    AltaAdminComponent,
    ValidarEspecialistaComponent,
    TurnosComponent,
    SolicitarTurnoComponent,
    AhistoriaClinicaComponent,
    
  ],
  imports: [
    CommonModule,
    HomeAdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class HomeAdministradorModule { }
