import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(){}

  especialistaSelec = false;
  pacienteSelec = false;
  select = true;

  especialidades:Array<string> = ["Enfermeria","Medicina General","Cardiologia","Ginecología","Neurología","Psicología","Cirugía General","Otra"];
  obrasSociales:Array<string> = ["Unión Personal","Sancor Salud","Swiss Medical","Medicus","Galeno","Osde","Osplad"];
  especialidadElegida:string = "";
  obraSocialElegida:string  = "";

  nombre:string = "";
  apellido:string = "";
  edad:number = 0;
  dni:number = 0;
  email:string = "";
  contrasenia:string = "";
  miEspecialidad:string = "";
  fotos:any = []


  Especialista(){
    this.especialistaSelec = true;
    this.select = false;
    setTimeout(()=>{},1000);
  }

  Paciente(){
    this.pacienteSelec = true;
    this.select = false;
    setTimeout(()=>{},1000);
  }

  EspecialidadSelec(){
    console.log(this.especialidadElegida)
  }

  ObraSelec(){
    let rt = document.getElementById('obra');
    console.log(rt);
  }

  verificarMailDNI()
  {
    
  }

}
