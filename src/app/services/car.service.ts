import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


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

  getCarById(carId:number):Observable<SingleResponseModel<Car>>{
    let path = this.apiUrl + "cars/getbyid?id=" + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(path);
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
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(path);
  }

  getDetail(carId:number):Observable<SingleResponseModel<CarDetailDto>>{
    let path = this.apiUrl + "cars/detail?id=" + carId;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(path);
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

  add(car:Car):Observable<ResponseModel>{
    let path = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(path, car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let path = this.apiUrl + "cars/delete";
    return this.httpClient.post<ResponseModel>(path, car);
  }

  update(car:Car):Observable<ResponseModel>{
    let path = this.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(path, car);
  }
}
