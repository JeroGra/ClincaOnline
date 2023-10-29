export class Paciente {

    id?:string;
    nombre?:string;
    apellido?:string;
    edad?:number;
    dni?:number;
    obraSocial?:any;
    email?:string;
    contraseña?:string;
    fotos:Array<string> = [];
    cuentaValidadaEmail:boolean = false;
    tipo = "Paciente"
}
