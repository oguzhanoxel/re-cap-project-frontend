import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  constructor() { }

  checkFindex(userFindex:number, carFindex:number):boolean{
    if(userFindex>=carFindex){
      return true
    }else{
      return false
    }
  }
}
