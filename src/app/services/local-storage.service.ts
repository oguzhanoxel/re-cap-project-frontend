import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  constructor(
    ) { }

  set(key:string, data:any){
    localStorage.setItem(key,JSON.stringify(data));
  }

  get(key:string){
    return JSON.parse(localStorage.getItem(key)!);
  }

  remove(key:string){
    localStorage.removeItem(key);
  }
}
