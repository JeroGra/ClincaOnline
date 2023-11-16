import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { PhistoriaClinicaComponent } from './componentes/phistoria-clinica/phistoria-clinica.component';



@NgModule({
  declarations: [
    HomeComponent,
    SolicitarTurnoComponent,
    TurnosComponent,
    PhistoriaClinicaComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
  ]
})
export class HomeModule { }
