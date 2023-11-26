import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEspecialistaComponent } from './home-especialista.component';
import { MiPerfilComponent } from 'src/app/componentes/mi-perfil/mi-perfil.component';
import { TurnosComponent } from '../home-especialista/componentes/turnos/turnos.component';
import { EhistoriaClinicaComponent } from './componentes/ehistoria-clinica/ehistoria-clinica.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';


const routes: Routes = [{ path: '', component: HomeEspecialistaComponent,
children:[
  {path:'miPerfil', component:MiPerfilComponent,data: {animation: 'OtherPage'} },
  {path:'turnos', component:TurnosComponent,data: {animation: 'OtherPage'} },
  {path:'historiaClinica', component:EhistoriaClinicaComponent,data: {animation: 'OtherPage'} },
  {path:'pacientes', component:PacientesComponent,data: {animation: 'UsersPage'}},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeEspecialistaRoutingModule { }
