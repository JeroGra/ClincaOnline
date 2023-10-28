import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { BienvenidoComponent } from './bienvenido.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';


@NgModule({
  declarations: [
    BienvenidoComponent,
    LoginComponent,
    RegisterComponent,
    BienvenidaComponent
  ],
  imports: [
    CommonModule,
    BienvenidoRoutingModule,
    FormsModule,
  ]
})
export class BienvenidoModule { }
