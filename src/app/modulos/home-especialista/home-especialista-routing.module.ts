import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEspecialistaComponent } from './home-especialista.component';
import { MiPerfilComponent } from 'src/app/componentes/mi-perfil/mi-perfil.component';
import { TurnosComponent } from '../home-administrador/componentes/turnos/turnos.component';

const routes: Routes = [{ path: '', component: HomeEspecialistaComponent,
children:[
  {path:'miPerfil', component:MiPerfilComponent },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeEspecialistaRoutingModule { }