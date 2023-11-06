import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAdministradorRoutingModule } from './home-administrador-routing.module';
import { HomeAdministradorComponent } from './home-administrador.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ValidarEspecialistaComponent } from './componentes/validar-especialista/validar-especialista.component';


@NgModule({
  declarations: [
    HomeAdministradorComponent,
    AltaAdminComponent,
    ValidarEspecialistaComponent,
    
  ],
  imports: [
    CommonModule,
    HomeAdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomeAdministradorModule { }
