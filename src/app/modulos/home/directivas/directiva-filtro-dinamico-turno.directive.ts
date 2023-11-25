import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';


@Directive({
  selector: '[appDirectivaFiltroDinamicoTurno]'
})
export class DirectivaFiltroDinamicoTurnoDirective {

  @Input() filtro:string = "";
  @Input() historiasClinicas:Array<HistoriaClinica> = [];

  constructor(private el: ElementRef) { }

  @Output() filtroEvent = new EventEmitter<any>;

  @HostListener('keyup') Filtrar(){

    let historiasCFiltradas : Array<HistoriaClinica> = []

    if(this.filtro === ""){
      this.filtroEvent.emit({historias:historiasCFiltradas,filtrar:false})
    }else{
      historiasCFiltradas = this.ObrtenerHistoriasClave(this.filtro)
      this.filtroEvent.emit({historias:historiasCFiltradas,filtrar:true})
    }
  }

  ObrtenerHistoriasClave(clave:string){

    let arrHs : Array<HistoriaClinica> = []

    for(let hs of this.historiasClinicas){
      if(this.EvaluarClaves(clave.toLowerCase(),hs.diagnostico.clave.toLowerCase())){
        arrHs.push(hs);
        console.log("es igual");
      }else{
        console.log("no es igual");
      }
    }

    return arrHs;

  }

  EvaluarClaves(claveInput:string,claveHs:string){

    let arrCLI = claveInput.split("");
    let arrCL = claveHs.split("");
    let rt = false;
    let cli = 0
    for(let x = 0; x < arrCLI.length;x++){
      for(let y = 0; y <= x;y++){
        if(x < arrCLI.length){
          cli = x;
          x++
          console.log(arrCLI[cli]);
          console.log( arrCL[y]);
          if(arrCLI[cli] === arrCL[y]){
            rt = true;
          }else{
            rt = false;
            break;
          }
        }else{
          break;
        }
      }
    }
    return rt;
  }

}
