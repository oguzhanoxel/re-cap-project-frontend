import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length:number): string {
    return value.length > length ? value.substring(0,length)+"...":value;
  }

}
