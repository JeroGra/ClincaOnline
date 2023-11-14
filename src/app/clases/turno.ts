import { Especialista } from "./especialista"
import { Paciente } from "./paciente"

export class Turno {

    id?:string
    especialidad?:string
    especialista?:Especialista
    paciente?:Paciente
    aceptado?:boolean = false
    finalizado?:boolean = false
    cancelado?:boolean = false
    anio?:string
    mes?:string
    dia?:string
    horarioInicio?:string
    resenia?:string = ""
    calificacionAtencion?:string = ""
    resultadoEncuesta?:string = ""
    diaDeSolicitud?:any = null
    diaDeCancelacion?:any = null
    diaDeFinalizacion?:any = null
    motivoCancelado?:string = ""

}
