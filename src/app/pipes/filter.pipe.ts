import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  private resultText:string

  constructor( private toastrService:ToastrService){}
  
  transform(value: CarDetailDto[], filterText: string): CarDetailDto[] {
    filterText = filterText?filterText.toString().toLocaleLowerCase():""
    let newValue = filterText?value.filter((c:CarDetailDto) => 
    c.carName.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    c.colorName.toLocaleLowerCase().indexOf(filterText)!==-1
    ):value;
    this.resultText = filterText + " searched.\n" + newValue.length + " results found"
    if(filterText){
      this.toastrService.success(this.resultText.toString())
    }
    return newValue
  }

}
