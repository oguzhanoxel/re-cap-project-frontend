import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  private resultText:string

  constructor( private toastrService:ToastrService){}

  transform(value: CarDetailDto[], searchText: string): CarDetailDto[] {
    searchText = searchText?searchText.toString().toLocaleLowerCase():""
    let newValue = searchText?value.filter((c:CarDetailDto) => 
    c.carName.toLocaleLowerCase().indexOf(searchText)!==-1 ||
    c.brandName.toLocaleLowerCase().indexOf(searchText)!==-1 ||
    c.colorName.toLocaleLowerCase().indexOf(searchText)!==-1
    ):value;
    this.resultText = "'" + searchText + "' searched.\n" + newValue.length + " results found"
    if(searchText){
      this.toastrService.success(this.resultText.toString())
    }
    return newValue
  }

}
