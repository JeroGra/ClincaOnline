import { Usuario } from "./usuario";

export class Paciente extends Usuario {

    
    obraSocial?:any;
    fotos:Array<string> = [];
    cuentaValidadaEmail:boolean = false;
    tipo = "Paciente"

}
