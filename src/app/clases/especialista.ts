import { Usuario } from "./usuario";

export class Especialista extends Usuario {

    fotos:Array<string> = [];
    especialidades:any = [];
    cuentaValidadaEmail:boolean = false;
    cuentaHabilitada:boolean = false;
    tipo = "Especialista"
    horarios:Array<any> = []

}
