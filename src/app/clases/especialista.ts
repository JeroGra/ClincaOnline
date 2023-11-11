import { Usuario } from "./usuario";

export class Especialista extends Usuario {

    fotos:Array<any> = [];
    especialidades:any = [];
    cuentaValidadaEmail:boolean = false;
    cuentaHabilitada:boolean = false;
    tipo = "Especialista"
    horarios:any = {
        lunes:{
            inicio:null,
            fin:null,
          },
          martes:{
            inicio:null,
            fin:null,
          },
          miercoles:{
            inicio:null,
            fin:null,
          },
          jueves:{
            inicio:null,
            fin:null,
          },
          viernes:{
            inicio:null,
            fin:null,
          },
          sabado:{
            inicio:null,
            fin:null,
          }
    }

}
