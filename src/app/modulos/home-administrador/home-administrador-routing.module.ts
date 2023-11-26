import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdministradorComponent } from './home-administrador.component';
import { MiPerfilComponent } from 'src/app/componentes/mi-perfil/mi-perfil.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { ValidarEspecialistaComponent } from './componentes/validar-especialista/validar-especialista.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';
import { AhistoriaClinicaComponent } from './componentes/ahistoria-clinica/ahistoria-clinica.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

const routes: Routes = [{ path: '', component: HomeAdministradorComponent,
children:[
  {path:'miPerfil', component:MiPerfilComponent,data: {animation: 'OtherPage'} },
  {path:'turnos', component:TurnosComponent,data: {animation: 'OtherPage'} },
  {path:'solicitarTurno', component:SolicitarTurnoComponent,data: {animation: 'OtherPage'} },
  {path:'altaAdmin', component:AltaAdminComponent,data: {animation: 'OtherPage'} },
  {path:'validarEspecialista', component:ValidarEspecialistaComponent,data: {animation: 'OtherPage'} },
  {path:'historiaClinica', component:AhistoriaClinicaComponent,data: {animation: 'OtherPage'} },
  {path:'estadisticas', component:EstadisticasComponent,data: {animation: 'OtherPage'} },
  {path:'usuarios', component:UsuariosComponent,data: {animation: 'UsersPage'} },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAdministradorRoutingModule { }
