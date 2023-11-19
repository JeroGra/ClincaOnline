import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diasPipe'
})
export class DiasPipePipe implements PipeTransform {

  constructor(){}

  transform(value: unknown, ...args: unknown[]): unknown {

    let newValue = ''

    if(value === 'Monday'){
      newValue = 'Lunes';
    }else if(value === 'Tuesday '){
      newValue = 'Martes';
    }else if(value === 'Wednesday'){
      newValue = 'Miercoles';
    }else if(value === 'Thursday'){
      newValue = 'Jueves';
    }else if(value === 'Friday'){
      newValue = 'Viernes';
    }else if(value === 'Saturday'){
      newValue = 'Sabado';
    }else if(value === 'Sunday'){
      newValue = 'Domingo';
    }

    return newValue;
  }

}
