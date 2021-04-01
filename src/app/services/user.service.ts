import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl + 'users/'

  constructor(
    private httpClient: HttpClient
  ) { }
  
  getClaims(user:User):Observable<ListResponseModel<User>>{
    let path = this.apiUrl + 'getclaims'
    return this.httpClient.post<ListResponseModel<User>>(path, user);
  }

  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + 'getbymail?email='+email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  add(user:User):Observable<ResponseModel>{
    let path = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(path, user);
  }
  
  delete(user:User):Observable<ResponseModel>{
    let path = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(path, user);
  }
  
  update(user:User):Observable<ResponseModel>{
    let path = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(path, user);
  }
}
