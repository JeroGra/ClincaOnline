import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MiPerfilComponent } from 'src/app/componentes/mi-perfil/mi-perfil.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';

const routes: Routes = [{ path: '', component: HomeComponent,
children:[
  {path:'miPerfil', component:MiPerfilComponent },
  {path:'turnos', component:TurnosComponent },
  {path:'solicitarTurno', component:SolicitarTurnoComponent },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
