import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let path = this.apiUrl + "rentals/getall"
    return this.httpClient.get<ListResponseModel<Rental>>(path);
  }

  getDetails():Observable<ListResponseModel<RentalDetailDto>>{
    let path = this.apiUrl + "rentals/details"
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(path);
  }

  getByCar(carId:number):Observable<SingleResponseModel<Rental>>{
    let path = this.apiUrl + "rentals/getbycarid?id=" + carId
    return this.httpClient.get<SingleResponseModel<Rental>>(path)
  }

  getRentalsByUserId(userId:number):Observable<ListResponseModel<Rental>>{
    let path = this.apiUrl + "rentals/getrentalsbyuserid?id=" + userId
    return this.httpClient.get<ListResponseModel<Rental>>(path)
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
