import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailDtoResponseModel } from '../models/customerDetailDtoResponseModel';
import { CustomerResponseModel } from '../models/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "https://localhost:44348/api/customers/"
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>(this.apiUrl+"getall");
  }
  getDetails():Observable<CustomerDetailDtoResponseModel>{
    return this.httpClient.get<CustomerDetailDtoResponseModel>(this.apiUrl+"details");
  }
}
