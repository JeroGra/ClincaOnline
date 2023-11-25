import { AfterContentInit, Component } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';
//@ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
//@ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-phistoria-clinica',
  templateUrl: './phistoria-clinica.component.html',
  styleUrls: ['./phistoria-clinica.component.css']
})
export class PhistoriaClinicaComponent implements AfterContentInit {

  pacientes:Array<Paciente> = [];
  paciente = new Paciente
  historiaClinica = new HistoriaClinica
  especialista = new Especialista
  turnos : Array<Turno> = []
  historiaClinicaPaciente : Array<HistoriaClinica> = []
  verHistoria = false;
  datePipe = new DatePipe('en-Ar')
  columnas : Array<any> = ['fecha diagnostico','turno','diagnostico']
  filas : Array<any> = []
  especialistas : Array<Especialista> = []
  selectHc = true;
  selectEsp  = false
  hcFijas   : Array<HistoriaClinica> = []
  constructor(private bd : BaseDatosService, private log : LocalStorageEncriptService,private spinner: NgxSpinnerService){

  }
  
  ngAfterContentInit() {
    this.spinner.show();
    let logObj = this.log.GetEncriptStorage()
    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.paciente = obj;
      this.TraerHistoriaClinicaPaciente()
      this.bd.TraerUsuarioPorTipo('Especialista').subscribe((esp:any)=>{
        this.especialistas = esp
      })

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

  TraerHistoriaClinicaPaciente(){
    this.historiaClinicaPaciente = []
    this.bd.TraerHistoriasClinicasPorIdUsuario(this.paciente.id as string,"Paciente").subscribe((hc)=>{
      this.historiaClinicaPaciente = hc as Array<HistoriaClinica>
      this.hcFijas = hc as Array<HistoriaClinica>
    })
  }

  SelectHistoria(hc:HistoriaClinica){
    this.historiaClinica = hc;
    this.TraerEspecialistaHistoriaClinica()
    this.verHistoria = true;
  }

  TraerEspecialistaHistoriaClinica(){
    this.bd.TraerUsuarioPorId(this.historiaClinica.idEspecialista as string).then((obj:any)=>{
      this.especialista = obj;
    })
  }

  ChangeToSelectEspe(){
    this.selectHc = false;
    this.verHistoria = false;
    this.selectEsp = true;
    this.historiaClinicaPaciente = this.hcFijas
    let arr : Array<Especialista> = []
    let equal = false;
    for(let hc of this.historiaClinicaPaciente){
      for(let esp of  this.especialistas){
        if(esp.id === hc.idEspecialista){
          if(arr.length > 0){
            equal = false 
            for(let e of  arr){
              if(e.id === esp.id){
                //arr.push(esp)
                equal = true;
                break;
              }
            }

            if(!equal){
              arr.push(esp)
            }

          }else{
            arr.push(esp)
            break;
          }
        }
      }
    }
    this.especialistas = arr;

  }

  ChangeToSelectHC(){
    this.selectHc = true;
    this.selectEsp = false;
  }

  SelectEspecialista(esp:Especialista){
    this.historiaClinicaPaciente = this.hcFijas;
    let hc : Array<HistoriaClinica> = []
    for(let hcp of this.historiaClinicaPaciente){
      if(hcp.idEspecialista === esp.id){  
          hc.push(hcp);
      }
    }
    this.historiaClinicaPaciente = hc;
    this.ChangeToSelectHC();
  }

  
  Reset(){
    this.historiaClinicaPaciente = this.hcFijas;
  }

  GenerarTablaHCPDF(){
    this.filas = []
    this.filas.push(['Fecha del Diagnostico','Turno','Especialista','Diagnostico'])
      this.historiaClinicaPaciente.forEach((hc:HistoriaClinica)=>{
        for(let e of this.especialistas){
          if(e.id === hc.idEspecialista){
            let row = [
              this.datePipe.transform(hc.fechaDeCreacion,'yyyy/MM/dd'),hc.turno,e.nombre + " " + e.apellido,hc.diagnostico.clave + " "+ hc.diagnostico.valor
            ]
            this.filas.push(row)
            break;
          }
        }
      })
  }

  async CrearPDF(){
    const pdfDefinition : any = {
      content:[
        {
          text: 'ClinicaOnline',
          style: 'header',
          alignment: 'center',
          fontSize: 30, bold: true,
          margin: [0, 10],
        },
        {
          image: 'logo',
          width: 150,
          height: 150,
          alignment: 'center',
          margin: [0, 20],
        },
        {text:'Diagnostico de '+this.paciente.nombre+' '+this.paciente.apellido + ' Referida al turno del '+this.historiaClinica.turno, style: 'header',	alignment: 'center',fontSize: 20, bold: true,	margin: [0, 1],},
        {text:'Generada en la fecha de '+this.datePipe.transform(this.historiaClinica.fechaDeCreacion,'yyyy/MM/dd') + ' Por el Especialista '+this.especialista.nombre + ' '+this.especialista.apellido, alignment: 'center',fontSize: 15, bold: true,	margin: [0, 5],},
        {
          ul: [
            'Altura ' +this.historiaClinica.altura+'cm',
            'Peso '+this.historiaClinica.peso+'kg',
            'Temperatura '+this.historiaClinica.temperatura+'C°',
            'Presión arterial sistólica '+this.historiaClinica.presion
          ]
        },
        {text:'\nDiagnostico', alignment: 'center',fontSize: 15, bold: true,	margin: [0, 20],},
        {
          ul: [
            this.historiaClinica.diagnostico.clave + ' '+this.historiaClinica.diagnostico.valor,
          ]
        }
      ],

      images:{
        logo: await this.getBase64ImageFromURL("../../../../../assets/imagenes/logo.png")
      }

    }

    const pdf = pdfMake.createPdf(pdfDefinition).download('Diagnostico_'+this.paciente.nombre+'_'+this.paciente.apellido+'_'+this.historiaClinica.fechaDeCreacion+'.pdf');   
  }

  async CrearPDFHS(){
    this.GenerarTablaHCPDF();
    const pdfDefinition : any = {
      content:[
        {
          text: 'Historia Clinica',
          style: 'header',
          alignment: 'center',
          fontSize: 40, bold: true,
          margin: [0, 10],
        },
        {
          text: 'ClinicaOnline',
          style: 'header',
          alignment: 'center',
          fontSize: 30, bold: true,
          margin: [0, 10],
        },
        {
          image: 'logo',
          width: 150,
          height: 150,
          alignment: 'center',
          margin: [0, 20],
        },
        {
          table:
          {
            headerRows: 1,
              body:this.filas
          }
        }
        
      ],

      images:{
        logo: await this.getBase64ImageFromURL("../../../../../assets/imagenes/logo.png")
      }

    }

    const pdf = pdfMake.createPdf(pdfDefinition).download('Historia_Clinica'+this.paciente.nombre+'_'+this.paciente.apellido+'_'+this.historiaClinica.fechaDeCreacion+'.pdf');   
  }

  getBase64ImageFromURL(url:any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0); 
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }


}
