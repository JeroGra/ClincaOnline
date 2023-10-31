import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';

const routes: Routes = [
  { path:"",redirectTo:"bienvenido", pathMatch:'full' },
  { path: 'home', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule) }, 
  { path: 'bienvenido', loadChildren: () => import('./modulos/bienvenido/bienvenido.module').then(m => m.BienvenidoModule) },
  { path: '*', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
