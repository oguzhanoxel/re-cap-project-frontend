import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44348/api/"
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let path = this.apiUrl + "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }

  getDetails():Observable<ListResponseModel<CarDetailDto>>{
    let path = this.apiUrl + "cars/details";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(path);
  }

  getDetailsByBrand(brandId:number):Observable<ListResponseModel<CarDetailDto>>{
    let path = this.apiUrl + "cars/detailsbybrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(path);
  }

  getDetailsByColor(colorId:number):Observable<ListResponseModel<CarDetailDto>>{
    let path = this.apiUrl + "cars/detailsbycolorid?id=" + colorId;
    console.log(this.httpClient.get<ListResponseModel<CarDetailDto>>(path));
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(path);
  }

  getDetail(carId:number):Observable<ListResponseModel<CarDetailDto>>{
    let path = this.apiUrl + "cars/detail?id=" + carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(path);
  }

  getDetailsFilter(brandId?:number, colorId?:number):Observable<ListResponseModel<CarDetailDto>>{
    let path = this.apiUrl + "cars/detailsfilter?"
    if (brandId !== undefined) { path += 'brandId=' + brandId + '&';}
    if (colorId !== undefined) { path += 'colorId=' + colorId + '&';}
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(path);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetailDto>>{
    let path = this.apiUrl + "cars/getcarsbybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(path);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetailDto>>{
    let path = this.apiUrl + "cars/getcarsbycolorid?id="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(path);
  }
}
