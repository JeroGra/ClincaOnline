import { Component } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LocalStorageEncriptService } from 'src/app/servicios/local-storage-encript.service';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-phistoria-clinica',
  templateUrl: './phistoria-clinica.component.html',
  styleUrls: ['./phistoria-clinica.component.css']
})
export class PhistoriaClinicaComponent {

  pacientes:Array<Paciente> = [];
  paciente = new Paciente
  historiaClinica = new HistoriaClinica
  especialista = new Especialista
  turnos : Array<Turno> = []
  historiaClinicaPaciente : Array<HistoriaClinica> = []
  verHistoria = false;
  datePipe = new DatePipe('en-Ar')

  constructor(private bd : BaseDatosService, private log : LocalStorageEncriptService){

    let logObj = this.log.GetEncriptStorage()

    this.bd.TraerUsuarioPorId(logObj.id).then((obj:any)=>{
      this.paciente = obj;
      this.TraerHistoriaClinicaPaciente()
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

  TraerHistoriaClinicaPaciente(){
    this.historiaClinicaPaciente = []
    this.bd.TraerHistoriasClinicasPorIdUsuario(this.paciente.id as string,"Paciente").subscribe((hc)=>{
      this.historiaClinicaPaciente = hc as Array<HistoriaClinica>
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
        {text:'Historia Clinica de '+this.paciente.nombre+' '+this.paciente.apellido, style: 'header',	alignment: 'center',fontSize: 20, bold: true,	margin: [0, 1],},
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

    const pdf = pdfMake.createPdf(pdfDefinition).download('HistoriaClinica_'+this.paciente.nombre+'_'+this.paciente.apellido+'_'+this.historiaClinica.fechaDeCreacion+'.pdf');   
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
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
