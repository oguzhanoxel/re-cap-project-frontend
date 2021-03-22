import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(){}

  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private messageSource = new  BehaviorSubject(this.editDataDetails);
  
  currentMessage = this.messageSource.asObservable();
  
  changeMessage(message: string) {
  this.messageSource.next(message)
  }
}
