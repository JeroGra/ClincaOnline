import { Usuario } from "./usuario";

export class Administrador extends Usuario {

    fotos:Array<any> = [];
    cuentaValidadaEmail:boolean = false;
    tipo = "Administrador"

}
