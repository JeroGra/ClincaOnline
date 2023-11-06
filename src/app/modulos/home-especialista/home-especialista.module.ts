import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeEspecialistaRoutingModule } from './home-especialista-routing.module';
import { HomeEspecialistaComponent } from './home-especialista.component';


@NgModule({
  declarations: [
    HomeEspecialistaComponent
  ],
  imports: [
    CommonModule,
    HomeEspecialistaRoutingModule
  ]
})
export class HomeEspecialistaModule { }
