export class Usuario {

    id?:string;
    nombre?:string;
    apellido?:string;
    edad?:number;
    dni?:number;
    email?:string;
    contrasenia?:string;
    turnos:Array<any> = []

    toObjetJSON(){
        return JSON.parse(JSON.stringify(this));
    }

}
