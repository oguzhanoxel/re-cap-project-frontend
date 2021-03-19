import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetailDto } from '../models/customerDetailDto';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "https://localhost:44348/api/customers/"
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl+"getall");
  }
  getDetails():Observable<ListResponseModel<CustomerDetailDto>>{
    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(this.apiUrl+"details");
  }
}
