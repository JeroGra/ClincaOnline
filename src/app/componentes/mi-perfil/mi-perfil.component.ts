import { Component } from '@angular/core';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {

  objLog:any
  user:any;
  imagenes:any;

  constructor(private log : LocalStorageEncriptService, private bd : BaseDatosService){
   this.objLog = this.log.GetEncriptStorage();
    this.bd.TraerUsuarioPorEmail(this.objLog.email).then((user)=>{
      this.user = user;
      this.imagenes = this.user.fotos;
    })
  } 



}
