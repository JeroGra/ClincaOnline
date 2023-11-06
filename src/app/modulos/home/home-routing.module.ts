import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MiPerfilComponent } from 'src/app/componentes/mi-perfil/mi-perfil.component';

const routes: Routes = [{ path: '', component: HomeComponent,
children:[
  {path:'miPerfil', component:MiPerfilComponent },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
