import { Usuario } from "./usuario";

export class Paciente extends Usuario {

    
    obraSocial?:any;
    fotos:Array<any> = [];
    cuentaValidadaEmail:boolean = false;
    tipo = "Paciente"

}
