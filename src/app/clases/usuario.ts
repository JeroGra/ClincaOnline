export class Usuario {

    id?:string;
    nombre?:string;
    apellido?:string;
    edad?:number;
    dni?:number;
    email?:string;
    contrasenia?:string;

    toObjetJSON(){
        return JSON.parse(JSON.stringify(this));
    }

}
