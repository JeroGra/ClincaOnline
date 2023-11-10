import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { BienvenidoComponent } from './bienvenido.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { DColorBtnDirective } from './directivas/d-color-btn.directive';


@NgModule({
  declarations: [
    BienvenidoComponent,
    LoginComponent,
    RegisterComponent,
    BienvenidaComponent,
    DColorBtnDirective,
  ],
  imports: [
    CommonModule,
    BienvenidoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BienvenidoModule { }
