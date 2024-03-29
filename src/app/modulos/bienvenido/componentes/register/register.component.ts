import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,NgForm,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2'
import { Auth, createUserWithEmailAndPassword , getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/auth.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formEspecialista : FormGroup
  public formPaciente : FormGroup
  usuarios : Array<Usuario> = []
  
  especialidades:Array<any> = [];
  obrasSociales:Array<string> = ["Unión Personal","Sancor Salud","Swiss Medical","Medicus","Galeno","Osde","Osplad"];

  constructor(private fb : FormBuilder,
    private ruta : Router,private encriptService :LocalStorageEncriptService,
    private bd : BaseDatosService, private storage : Storage, private auth : AuthService,
  ){
    
    this.bd.TraerUsuarios().subscribe((sub:any)=>{
      this.usuarios = sub;
    });

    this.bd.TraerEspecialidades().subscribe((esp:any)=>{
       let e = esp as Array<any>
        this.especialidades = []
       e.forEach(element => {
        let esp = {
          especialidad:element.especialidad,
          elegida:false
        }
        this.especialidades.push(esp)
       });
       
    })

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
     /* especialidad : ['',[
        Validators.required,
      ]],*/
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

    this.GetCaptcha()

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

  especialidadElegida:string = "";
  obraSocialElegida:string  = "";

  especialidadesElegidas : Array<string> = []
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
  espOtra = false;
  esOtraErrorObligatorio = false;
  esOtraErrorMinMax = false;
  disabled = false;

  robot = true;

  captchas = [{img:"../../../../../assets/imagenes/c1.png",clave:"s22xz"},
  {img:"../../../../../assets/imagenes/c2.png",clave:"x4j2v"},
  {img:"../../../../../assets/imagenes/c3.png",clave:"78qa9"},
  {img:"../../../../../assets/imagenes/c4.png",clave:"rr52s"},]
  captchaActual:any
  micaptcha = ""

  VerificarCaptcha(){
    console.log(this.micaptcha)
    if(this.micaptcha === this.captchaActual.clave){
      this.robot = false;
      this.Toast.fire({
        icon: 'success',
        title: 'No eres un robot!',
        color:'#80ED99',
      })
    }else{

      this.Toast.fire({
        icon: 'error',
        title: "Codigo Captcha Invalido",
        color:'#fb7474',
      })
      this.GetCaptcha()
    }
  }

  GetCaptcha(){
    let captchaSorted = Math.floor(Math.random() * this.captchas.length);
    this.captchaActual = this.captchas[captchaSorted];
    this.micaptcha = "";
  }


  bienvenida(){
    this.ruta.navigateByUrl("bienvenido/bienvenida")
  }
  
 /*OtraEsp(event:any){

    if(this.especialidadElegida == 'Otra'){
        this.disabled = true;
    }else{
      this.disabled = false
      this.esOtraErrorObligatorio = false;
      this.esOtraErrorMinMax = false;
      this.miEspecialidad = "";
    }
  }*/

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

  OtraEsp(){
    if( this.especialidadElegida === "Otra"){
      this.especialidadElegida = ""
      this.disabled = false;
    }else{
      this.especialidadElegida = "Otra"
      this.disabled = true;
    }
  }

  OtraEspSubir(){
    this.especialidadesElegidas.push(this.miEspecialidad)
    this.espOtra = true;
  }

  EspSelect(esp:string,espe:any){
    let equals = false

    for(let x = 0;x<this.especialidadesElegidas.length;x++){
      if(this.especialidadesElegidas[x] === esp){
        equals = true;
        this.especialidadesElegidas = this.especialidadesElegidas.filter((i) => i !== esp)
        break;
      }
    }
    
  if(equals){ 
    espe.elegida = false;
    }else{
      this.especialidadesElegidas.push(esp)
      espe.elegida = true;
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
      
      let especialista = new Especialista
        especialista.nombre = this.nombre;
        especialista.apellido = this.apellido;
        especialista.dni = this.dni;
        especialista.edad = this.edad;
        especialista.email = this.email;
        especialista.contrasenia = this.encriptService.EncriptValue(this.contrasenia);

        if(this.especialidadesElegidas.length >= 1){
          especialista.especialidades = this.especialidadesElegidas
         if(this.especialidadElegida === 'Otra'){this.bd.AltaEspecialidad(this.miEspecialidad) }
          
          this.SubirImagenes(especialista)
        }else{
          this.Toast.fire({
            icon: 'error',
            title: "Eliga minimo una Especialidad",
            color:'#fb7474',
          })
        }

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

        this.auth.Registrar(this.email,this.contrasenia).then((userAuth)=>{
          this.bd.AltaUsuario(user).then(()=>{
            this.Toast.fire({
              icon: 'success',
              title: user.tipo + ' Registrado con Exito!',
              color:'#80ED99',
            })
              console.log(userAuth)
              let auth = getAuth()
              if(auth.currentUser !== null){
                sendEmailVerification(auth.currentUser).then((objRt)=>{
                  this.Toast.fire({
                    icon: 'success',
                    title: 'Enviamos un email de verificación!!',
                    color:'#80ED99',
                  })
                  console.log(objRt);
                  setTimeout(()=>{
                    this.encriptService.EncriptStorage(user);
                    this.ruta.navigateByUrl('bienvenido/login')
                  },2500)
                }).catch(error => console.log(error))
              }else{

              }
          }).catch(()=>{
            this.ruta.navigateByUrl('*');
          })
        }).catch((error)=>{
          this.Toast.fire({
            icon: 'error',
            title: error,
            color:'#fb7474',
          })
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
  
          this.auth.Registrar(this.email,this.contrasenia).then((userAuth)=>{
            this.bd.AltaUsuario(user).then(()=>{
              this.Toast.fire({
                icon: 'success',
                title: user.tipo + ' Registrado con Exito!',
                color:'#80ED99',
              })
                console.log(userAuth)
                let auth = getAuth()
                if(auth.currentUser !== null){
                  sendEmailVerification(auth.currentUser).then((objRt)=>{
                    this.Toast.fire({
                      icon: 'success',
                      title: 'Enviamos un email de verificación!!',
                      color:'#80ED99',
                    })
                    console.log(objRt);
                    setTimeout(()=>{
                      this.encriptService.EncriptStorage(user);
                      this.ruta.navigateByUrl('bienvenido/login')
                    },2500)
                  }).catch(error => console.log(error))
                }else{
  
                }
            }).catch(()=>{
              this.ruta.navigateByUrl('*');
            })
          }).catch((error)=>{
            this.Toast.fire({
              icon: 'error',
              title: error,
              color:'#fb7474',
            })
          })
  
        }else{
          this.banderaSubida = true;
        }
  
      })
  
    }
  }
  
}
