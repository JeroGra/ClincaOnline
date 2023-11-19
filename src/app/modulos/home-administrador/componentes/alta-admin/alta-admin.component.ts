import { Component } from '@angular/core';
import { getAuth, sendEmailVerification } from '@angular/fire/auth';
import { getDownloadURL, ref,Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.css']
})
export class AltaAdminComponent {

  public forms : FormGroup
  usuarios : Array<Usuario> = []

  constructor(private fb : FormBuilder,
    private ruta : Router,private encriptService :LocalStorageEncriptService,
    private bd : BaseDatosService, private storage : Storage, private auth : AuthService,private spinner: NgxSpinnerService){
      this.spinner.show();
    this.bd.TraerUsuarios().subscribe((sub:any)=>{
      this.usuarios = sub;
    });

    this.forms = this.fb.group({
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
    })
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
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

  select = true;

  nombre:string = "";
  apellido:string = "";
  edad:number = 0;
  dni:number = 0;
  email:string = "";
  contrasenia:string = "";
  fotos:Array<any> = [];
  imgPathUser:Array<any> = []
  foto1 = "";
  banderaSubida = false;



  CargaImagenUno($event:any){
    const file = $event?.target.files[0]
    this.fotos.push(file);
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

      if(verificacion.esRegistrable){

        this.ToastCargaUser.fire({
          toast : true,
          title:'Generando Administrador...',
          imageUrl:"../../../../../assets/imagenes/carga.gif",
          imageWidth: 200,
          imageHeight: 200,
          color: '#80ED99',
          background: '#22577A',
          backdrop: `
          rgba(15, 38, 54,0.6)`,
        })

        this.CrearUsuarioAdmin();

      }else{  this.Toast.fire({icon:'error', title:verificacion.mensaje, color:'#fe7070'}) }
  }

  Cancelar(){
    this.ruta.navigateByUrl('homeAdministrador/miPerfil');
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
  
  CrearUsuarioAdmin(){
    
      let admin = new Administrador
      admin.nombre = this.nombre;
      admin.apellido = this.apellido;
      admin.dni = this.dni;
      admin.edad = this.edad;
      admin.email = this.email;
      admin.contrasenia = this.encriptService.EncriptValue(this.contrasenia);
                
        this.SubirImagenes(admin)
    }

  SubirImagenes(user:Administrador){

    let x = 0
    this.fotos.forEach((file:any)=>{
      x++;
      let imgRef = ref(this.storage,`imagenes/usuarios/${user.dni}_${x}`);
      uploadBytes(imgRef,file).then((rt:any) => {
        
        this.TraerImagen(rt.metadata.name,user)
        
      }).catch(error => console.log(error))
    })
  }

  TraerImagen(img:any,user:Administrador){
  
    if(user.tipo === "Administrador"){
  
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
                    this.ruta.navigateByUrl('homeAdministrador/miPerfil')
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

    }
  }

}
