import { Usuario } from "./usuario";

export class Administrador extends Usuario {

    fotos:Array<string> = [];
    cuentaValidadaEmail:boolean = false;
    tipo = "Administrador"

}
