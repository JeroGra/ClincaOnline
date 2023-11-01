import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formEspecialista : FormGroup
  public formPaciente : FormGroup
  usuarios : Array<Usuario> = []

  constructor(private fb : FormBuilder,
    private ruta : Router,private encriptService :LocalStorageEncriptService,
    private bd : BaseDatosService, private storage : Storage){
    
    this.bd.TraerUsuarios().subscribe((sub:any)=>{
      this.usuarios = sub;
    });

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

   private Toast = Swal.mixin({
    toast: true,
    position: 'top',
    background:'#22577A',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  private ToastCargaUser = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
  })

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
  fotos:Array<any> = [];
  imgPathUser:Array<any> = []
  foto1 = "";
  foto2 = "";
  banderaSubida = false;

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

  CargaImagenUno($event:any){
    const file = $event?.target.files[0]
    this.fotos.push(file);
  }
  CargaImagenDos($event:any){
    const file = $event?.target.files[0]
    this.fotos.push(file);
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

  verificarMailDNI(mail:string, dni:number){
    let rt = {
      esRegistrable : true,
      mensaje:"",
    }

    for(let user of this.usuarios){

      if(user.dni === dni)
      {
          rt.mensaje = "Usuario ya existente";
          rt.esRegistrable = false;
          break;
      }else if(user.email === mail){
            rt.mensaje = "Este email ya esta en uso";
            rt.esRegistrable = false;
            break;
        }
    }

    return rt;
  }

  Registrar(){
    
    let verificacion = this.verificarMailDNI(this.email,this.dni);

    if(this.especialistaSelec){

      if(verificacion.esRegistrable){

        this.ToastCargaUser.fire({
          toast : true,
          title:'Generando Especialista...',
          imageUrl:"../../../../../assets/imagenes/carga.gif",
          imageWidth: 200,
          imageHeight: 200,
          color: '#80ED99',
          background: '#22577A',
          backdrop: `
          rgba(15, 38, 54,0.6)`,
        })

        this.CrearUsuario('Especialista');

      }else{  this.Toast.fire({icon:'error', title:verificacion.mensaje, color:'#fe7070'}) }

    }else{
      if(verificacion.esRegistrable){ 

        this.ToastCargaUser.fire({
          toast : true,
          title:'Generando Paciente...',
          imageUrl:"../../../../../assets/imagenes/carga.gif",
          imageWidth: 200,
          imageHeight: 200,
          color: '#80ED99',
          background: '#22577A',
          backdrop: `
          rgba(15, 38, 54,0.6)`,
        })

        this.CrearUsuario('Paciente');

      }else{  this.Toast.fire({icon:'error', title:verificacion.mensaje, color:'#fe7070'}) }
    }
  }

  Cancelar(){
    this.ruta.navigateByUrl('bienvenido/bienvenida');
  }

  
  pushUnique(array:Array<any>,obj:any)
  {
    let exist = false;
    for(let arr of array){
      
      if(arr.path == obj.path)
      {
        exist = true;
        break;
      }
    }
    
    if(exist){}else{array.push(obj)}
  }
  
  CrearUsuario(tipo : 'Especialista' | 'Paciente'){
    
    if(tipo=== "Especialista"){
      let especialidad;
      let especialista = new Especialista
        especialista.nombre = this.nombre;
        especialista.apellido = this.apellido;
        especialista.dni = this.dni;
        especialista.edad = this.edad;
        especialista.email = this.email;
        especialista.contrasenia = this.encriptService.EncriptValue(this.contrasenia);
        
        if(this.especialidadElegida === 'Otra'){ especialidad = this.miEspecialidad }else{ especialidad = this.especialidadElegida }
        
        especialista.especialidades.push(especialidad);
        
        this.SubirImagenes(especialista)

      }else{

        let paciente = new Paciente
        paciente.nombre = this.nombre;
        paciente.apellido = this.apellido;
        paciente.dni = this.dni;
        paciente.edad = this.edad;
        paciente.email = this.email;
        paciente.contrasenia = this.encriptService.EncriptValue(this.contrasenia);
        paciente.obraSocial = this.obraSocialElegida;
        
        this.SubirImagenes(paciente)
      }
    }

  SubirImagenes(user:Paciente | Especialista){

    let x = 0
    this.fotos.forEach((file:any)=>{
      x++;
      let imgRef = ref(this.storage,`imagenes/usuarios/${user.dni}_${x}`);
      uploadBytes(imgRef,file).then((rt:any) => {
        
        this.TraerImagen(rt.metadata.name,user)
        
      }).catch(error => console.log(error))
    })
  }

  TraerImagen(img:any,user:Especialista | Paciente){
  
    if(user.tipo === "Especialista"){
  
      let imgRef = ref(this.storage,'imagenes/usuarios/'+img);
  
      getDownloadURL(imgRef).then((url:any) => {
  
        console.log(url)
  
        let imagen : any = {
          path:url,
          name:img,
          dniUser:user.dni
        }
  
        user.fotos.push(imagen);
  
        this.bd.AltaUsuario(user).then(()=>{
          this.Toast.fire({
            icon: 'success',
            title: user.tipo + ' Registrado con Exito!',
            color:'#80ED99',
          })
  
        }).catch(()=>{
          this.ruta.navigateByUrl('*');
        })
      })
  
    }else{
      
      let imgRef = ref(this.storage,'imagenes/usuarios/'+img);
      getDownloadURL(imgRef).then((url:any) => {
  
        console.log(url)
  
        let imagen : any = {
          path:url,
          name:img,
          dniUser:user.dni
        }
  
        this.pushUnique(this.imgPathUser,imagen)
  
        if(this.banderaSubida){
  
          user.fotos = this.imgPathUser;
  
          this.bd.AltaUsuario(user).then(()=>{
            this.Toast.fire({
              icon: 'success',
              title: user.tipo + ' Registrado con Exito!',
              color:'#80ED99',
            })
          }).catch(()=>{
            this.ruta.navigateByUrl('*');
          })
  
        }else{
          this.banderaSubida = true;
        }
  
      })
  
    }
  }
  
}
