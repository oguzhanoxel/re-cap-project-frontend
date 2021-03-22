import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: CarDetailDto[], filterText: string): CarDetailDto[] {
    filterText = filterText?filterText.toString().toLocaleLowerCase():""
    return filterText?value.filter((c:CarDetailDto) => c.carName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
