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
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { FechaPipe } from './pipes/fechaAH.pipe';
import { NgChartsModule } from 'ng2-charts';
import { DiasPipePipe } from './pipes/dias-pipe.pipe';
import { ColorHoverDirective } from './directivas/color-hover.directive';
import { EnterActionDirective } from './directivas/enter-action.directive';
import { ClickActionDirective } from './directivas/click-action.directive';

@NgModule({
  declarations: [
    HomeAdministradorComponent,
    AltaAdminComponent,
    ValidarEspecialistaComponent,
    TurnosComponent,
    SolicitarTurnoComponent,
    AhistoriaClinicaComponent,
    EstadisticasComponent,
    FechaPipe,
    DiasPipePipe,
    ColorHoverDirective,
    EnterActionDirective,
    ClickActionDirective,
  ],
  imports: [
    CommonModule,
    HomeAdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgChartsModule,
    
  ],
})
export class HomeAdministradorModule { }
