import { AfterContentInit, Component } from '@angular/core';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
//@ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
//@ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements AfterContentInit {

  constructor(private bd : BaseDatosService){}

  logsS:any
  ngAfterContentInit() {
    this.bd.TraerLogs().subscribe((logs:any)=>{
      this.logsS = logs
    })
  }



}
