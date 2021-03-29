import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44348/api/"
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let path = this.apiUrl + "rentals/getall"
    return this.httpClient.get<ListResponseModel<Rental>>(path);
  }

  getDetails():Observable<ListResponseModel<RentalDetailDto>>{
    let path = this.apiUrl + "rentals/details"
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(path);
  }
  
  add(rental:Rental):Observable<ResponseModel>{
    let path = this.apiUrl + "rentals/add";
    return this.httpClient.post<ResponseModel>(path, rental)
  }

  delete(rental:Rental):Observable<ResponseModel>{
    let path = this.apiUrl + "rentals/delete";
    return this.httpClient.post<ResponseModel>(path, rental);
  }

  update(rental:Rental):Observable<ResponseModel>{
    let path = this.apiUrl + "rentals/update";
    return this.httpClient.post<ResponseModel>(path, rental);
  }
}
