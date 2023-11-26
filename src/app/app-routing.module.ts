import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { activateGuarPaciente, activateGuardAdmin, activateGuardEspecialista } from './guards/activate.guard';

const routes: Routes = [
  { path:"",redirectTo:"bienvenido", pathMatch:'full' },
  { path: 'bienvenido', loadChildren: () => import('./modulos/bienvenido/bienvenido.module').then(m => m.BienvenidoModule)  },
  { path: 'home', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule), canActivate:[activateGuarPaciente] }, 
  { path: 'homeEspecialista', loadChildren: () => import('./modulos/home-especialista/home-especialista.module').then(m => m.HomeEspecialistaModule), canActivate : [activateGuardEspecialista] },
  { path: 'homeAdministrador', loadChildren: () => import('./modulos/home-administrador/home-administrador.module').then(m => m.HomeAdministradorModule), canActivate: [activateGuardAdmin] },
  { path: '*', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
