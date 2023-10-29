export class Administrador {

    id?:string;
    nombre?:string;
    apellido?:string;
    edad?:number;
    dni?:number;
    especialidades:any = [];
    email?:string;
    contraseña?:string;
    fotos?:string;
    cuentaValidadaEmail:boolean = false;
    cuentaHabilitada:boolean = false;
    tipo = "Administrador"
}
