import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formEspecialista : FormGroup
  public formPaciente : FormGroup

  constructor(private fb : FormBuilder,
    private ruta : Router,private encriptService :LocalStorageEncriptService){
    
    this.formEspecialista = this.fb.group({
      nombre : ['',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]],
      apellido : ['',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]],
      edad : ['',[
        Validators.required,
        Validators.min(18),
      ]],
      dni : ['',[
        Validators.required,
        Validators.min(5000000),
        Validators.max(99000000),
      ]],
      email : ['',[
        Validators.required,

      ]],
      contrasenia : ['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]],
      foto : ['',[
        Validators.required,
      ]],
      especialidad : ['',[
        Validators.required,
      ]],
      miEspecialidad : ['',[

      ]],
    })

    this.formPaciente = this.fb.group({
      nombre : ['',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]],
      apellido : ['',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]],
      edad : ['',[
        Validators.required,
        Validators.min(18),
      ]],
      dni : ['',[
        Validators.required,
        Validators.min(5000000),
        Validators.max(99000000),
      ]],
      email : ['',[
        Validators.required,

      ]],
      contrasenia : ['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]],
      foto1 : ['',[
        Validators.required,
      ]],
      foto2 : ['',[
        Validators.required,
      ]],
      obraSocial : ['',[
        Validators.required,
      ]],
    })

  }

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

  esOtraErrorObligatorio = false;
  esOtraErrorMinMax = false;
  disabled = false;

  bienvenida(){
    this.ruta.navigateByUrl("bienvenido/bienvenida")
  }
  
  OtraEsp(event:any){

    if(this.especialidadElegida == 'Otra'){
        this.disabled = true;
    }else{
      this.disabled = false
      this.esOtraErrorObligatorio = false;
      this.esOtraErrorMinMax = false;
      this.miEspecialidad = "";
    }

  }

  esOtraEsp(event:any){
    
    if(this.miEspecialidad === ""){
      this.esOtraErrorObligatorio = true;
      this.disabled = true;
    }else{
      this.esOtraErrorObligatorio  = false;
      this.disabled = false;
      if(this.miEspecialidad.length < 7){
        this.esOtraErrorMinMax = true;
        this.disabled = true;
      }
      else{
        this.esOtraErrorMinMax = false;
        this.disabled = false;
        if(this.miEspecialidad.length > 29){
          this.esOtraErrorMinMax = true;
          this.disabled = true;
        }
        else{
          this.esOtraErrorMinMax = false;
          this.disabled = false;
        }
      }
    }
  }

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

  verificarMailDNI(){

  }

  Registrar(){
    
  }

  Cancelar(){
    this.especialistaSelec = false;
    this.pacienteSelec = false;
    this.select = true;
  }

}
