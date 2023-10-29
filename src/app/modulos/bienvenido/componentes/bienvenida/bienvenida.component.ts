import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {

  constructor(private ruta : Router, private encriptService : LocalStorageEncriptService){this.encriptService.RemoveEncriptStorage()}
  
  login(){
    this.ruta.navigateByUrl('bienvenido/login')
  }

  register(){
    this.ruta.navigateByUrl('bienvenido/register')
  }

}
