import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../models/car';
import { Rental } from '../models/rental';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
 

  constructor(
  ) { }


  calculateLastPrice(price:number, duration:number){
    return price*duration
  }

  checkPayment(data:any){
    return true;
  }
}
