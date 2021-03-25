import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  constructor(){}
  
  transform(value: CarDetailDto[], brandText: string, colorText:string): CarDetailDto[] {
   
    return value
  }

}
