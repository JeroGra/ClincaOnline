import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
//@ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
//@ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Turno } from 'src/app/clases/turno';
import { DatePipe } from '@angular/common';
import { DiasPipePipe } from '../../pipes/dias-pipe.pipe';
import Swal from 'sweetalert2';
import { Especialista } from 'src/app/clases/especialista';
import { utils, writeFileXLSX } from 'xlsx';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements AfterContentInit {

  logsS:any
  turnos:Array<Turno> = []
  especialidades:Array<any> = []
  especialistas : Array<Especialista> = []
  datePipe = new DatePipe('en-Ar')
  diaPipe = new DiasPipePipe()
  tituloGrafico = ""
  fechaI : any
  fechaF : any
  selectTEsp = true
  selectFTdia = false
  selectFechaGrafico = false
  mostrarGrafico2 = false;
  userLog = new Usuario

  constructor(private bd : BaseDatosService,private ruta : Router,private spinner: NgxSpinnerService){
  }

  barCharDataTurnoEsp : ChartData<'bar'> = {
    labels: ['Turnos'],
    datasets: [  ]
  }

  ngAfterContentInit() {
    this.spinner.show();
    this.bd.TraerLogs().subscribe((logs:any)=>{
      this.logsS = logs;
      this.logsS = this.logsS.sort((a:any, b:any) => b.fechaLog - a.fechaLog)
    })
    this.bd.TraerEspecialidades().subscribe((especialdiades:any)=>{
      this.especialidades = especialdiades

      this.bd.TraerTurnos().subscribe((turnos:any)=>{
        this.bd.TraerUsuarioPorTipo("Especialista").subscribe((especialistas:any)=>{
          this.especialistas = especialistas
          this.turnos = turnos
          this.SetArrayGraficoTurnoEspecialidad()
          this.chart?.update("show")
        })
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

  SetArrayGraficoTurnoEspecialidad(){
    this.barCharDataTurnoEsp.datasets = []
    this.especialidades.forEach((esp)=>{
      let obj = {
        data: [0],
        label:esp.especialidad,
        borderColor: 'rgba(0, 0, 0, 1)', // Color del borde
        borderWidth: 1,// Ancho del borde
      }
      for(let turno of this.turnos){
        if(turno.especialidad === esp.especialidad){
          obj.data[0]++;
        }
      }
        this.barCharDataTurnoEsp.datasets.push(obj as any)
    })
    this.tituloGrafico = "Turnos por especialidad"
  }

  SetArrayGraficoTurnoDias(){
    this.barCharDataTurnoEsp.datasets = []
    let flag = false
    let x = 0
    for(let turno of this.turnos){
      flag = false;
      x = 0
      let date = new Date(parseInt(turno.anio as string),parseInt(turno.mes as string),parseInt(turno.dia as string));

      let obj = {
        data:[0],
        label:this.diaPipe.transform(this.datePipe.transform(date,'EEEE')),
        borderColor: 'rgba(0, 0, 0, 1)', // Color del borde
        borderWidth: 1,// Ancho del borde
      }

      if(this.barCharDataTurnoEsp.datasets.length > 0){

          for(let datos of this.barCharDataTurnoEsp.datasets){
              if(datos.label === obj.label){
                x = datos.data[0]  as number
                x++
                datos.data[0] = x
                break;
              }else{
                flag = true;
              }
          }

      }else{
        obj.data[0]++;
        this.barCharDataTurnoEsp.datasets.push(obj as any)
      }

      if(flag){
        obj.data[0]++;
        this.barCharDataTurnoEsp.datasets.push(obj as any)
      }

    }
    this.tituloGrafico = "Turnos por dia"
  }


  SetArrayGraficoTurnosFinalizadosEsp(){
    if(this.ValidarFecha()){
      let fecha = ""
      this.barCharDataTurnoEsp.datasets = []
      this.especialistas.forEach((espe:Especialista)=>{

        let obj = {
          data: [0],
          label:espe.nombre +" "+ espe.apellido,
          borderColor: 'rgba(0, 0, 0, 1)', // Color del borde
          borderWidth: 1,// Ancho del borde
        }

        for(let turno of this.turnos){
          if(turno.especialista?.id === espe.id && turno.finalizado === true){
            fecha = `${turno.anio}-${turno.mes}-${turno.dia}`
            if(this.fechaI <= fecha && this.fechaF >= fecha){
              obj.data[0]++;
            }
          }
        }
        this.barCharDataTurnoEsp.datasets.push(obj as any)
      })

      this.chart?.update('show')
      this.tituloGrafico = "Turnos finalizados por especialista"
      this.mostrarGrafico2 = true;
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'Porfavor detalle seleccione las fechas',
        color:'#fb7474',
      })
    }
  }

  SetArrayGraficoTurnosSolicitadosEsp(){
    if(this.ValidarFecha()){
      let fecha = ""
      this.barCharDataTurnoEsp.datasets = []
      this.especialistas.forEach((espe:Especialista)=>{

        let obj = {
          data: [0],
          label:espe.nombre +" "+ espe.apellido,
          borderColor: 'rgba(0, 0, 0, 1)', // Color del borde
          borderWidth: 1,// Ancho del borde
        }

        for(let turno of this.turnos){
          if(turno.especialista?.id === espe.id && turno.aceptado === false && turno.cancelado === false){
            fecha = `${turno.anio}-${turno.mes}-${turno.dia}`
            if(this.fechaI <= fecha && this.fechaF >= fecha){
              obj.data[0]++;
            }
          }
        }
        this.barCharDataTurnoEsp.datasets.push(obj as any)
      })

      this.chart?.update('show')
      this.tituloGrafico = "Turnos solicitados por especialista"
      this.mostrarGrafico2 = true;
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'Porfavor detalle seleccione las fechas',
        color:'#fb7474',
      })
    }
  }

  SelectFiltro(filtro : 'Especialidades'|'Dias'|'Fecha'){

    this.mostrarGrafico2 = false;

    if(filtro === "Especialidades" ){
      this.selectTEsp = true
      this.selectFTdia = false
      this.selectFechaGrafico = false
      this.SetArrayGraficoTurnoEspecialidad()
    }
    if(filtro === "Dias" ){
      this.selectTEsp = false
      this.selectFTdia = true
      this.selectFechaGrafico = false
      this.SetArrayGraficoTurnoDias()
    }
    if(filtro === "Fecha" ){
      this.selectTEsp = false
      this.selectFTdia = false
      this.selectFechaGrafico = true
      this.tituloGrafico = "Seleccione un rango de fecha"
    }

    this.chart?.update('show')
  }

  ValidarFecha(){
    return this.fechaI !== undefined && this.fechaF !== undefined
  }

  //ARCHIVO XLSX
  rows: any[] = [ ];

  DescargarGraficoActual(){
    this.rows = []
    this.barCharDataTurnoEsp.datasets.forEach((x:any)=>{
        let obj = {
            tipoDato:x.label,
            turnosCantidad:x.data.toString()
        }
        this.rows.push(obj)
    })
  }
  DescargarLogsActual(){
    this.rows = []
    this.logsS.forEach((log:any) => {
      let obj = {
        logeado:this.datePipe.transform(log.fechaLog,'yyyy/MM/dd hh:mm')  ,
        idUsuario:log.user.id,
        tipoUsuario:log.user.tipo,
        nombreUsuario:log.user.nombre+" "+log.user.apellido
      }
      this.rows.push(obj)
    });
  }

  /* get state data and export to XLSX */
  onSaveGrafico(): void {

    this.DescargarGraficoActual()

    /* generate worksheet from state */
    const ws = utils.json_to_sheet(this.rows);
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    /* export to XLSX */
    writeFileXLSX(wb, "Grafico_Actual_"+Date.now()+".xlsx");
  }

  onSaveLogs(): void {

    this.DescargarLogsActual()

    /* generate worksheet from state */
    const ws = utils.json_to_sheet(this.rows);
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    /* export to XLSX */
    writeFileXLSX(wb, "Logs_Sistema"+Date.now()+".xlsx");
  }


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  //GRAFICO BARRAS

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max :100,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];


  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  ObtenerLogSelecionado(log:any)
  {
    this.userLog = log.user;
    Swal.fire({
      title: "Usuario del log",
      html:`<p><b>DNI</b>: ${this.userLog.dni} <b>NOMBRE</b>: ${this.userLog.nombre} ${this.userLog.apellido} </p>
            <p><b>EDAD</b> ${this.userLog.edad} <b>EMAIL</b>: ${this.userLog.email} </p>
            <p><b>TIPO DE USUARIO</b>: ${log.user.tipo} </p>`,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }

  FlechasCambiarGrafico(direccion:string){
    if(direccion === "derecha"){

      if(this.selectTEsp){
        this.SelectFiltro('Dias')
      }else  if(this.selectFTdia){
        this.SelectFiltro('Fecha')
      } else if(this.selectFechaGrafico){
        this.SelectFiltro('Especialidades')
      }
     

    }else if(direccion === "izquierda"){

      if(this.selectTEsp){
        this.SelectFiltro('Fecha')
      }else  if(this.selectFTdia){
        this.SelectFiltro('Especialidades')
      } else if(this.selectFechaGrafico){
        this.SelectFiltro('Dias')
      }
    
    }
  }

  CapturarEnter(ubicacion:string){
    if(ubicacion === "Tabla"){
      this.onSaveLogs()
    }
  }

  CapturarEscape(x:any){
    this.ruta.navigateByUrl('homeAdministrador/miPerfil')
  }

}
