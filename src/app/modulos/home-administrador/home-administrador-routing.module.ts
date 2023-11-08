import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdministradorComponent } from './home-administrador.component';
import { MiPerfilComponent } from 'src/app/componentes/mi-perfil/mi-perfil.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { ValidarEspecialistaComponent } from './componentes/validar-especialista/validar-especialista.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';

const routes: Routes = [{ path: '', component: HomeAdministradorComponent,
children:[
  {path:'miPerfil', component:MiPerfilComponent },
  {path:'turnos', component:TurnosComponent },
  {path:'solicitarTurno', component:SolicitarTurnoComponent },
  {path:'altaAdmin', component:AltaAdminComponent },
  {path:'validarEspecialista', component:ValidarEspecialistaComponent },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAdministradorRoutingModule { }