import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44348/api/"

  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
  ) { }

  login(loginModel:LoginModel){
    let path = this.apiUrl + "auth/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, loginModel)
  }

  logout(){
    this.localStorageService.remove("token")
  }

  register(registerModel:RegisterModel){
    let path = this.apiUrl + "auth/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, registerModel)
  }

  isAutheticated(){
    if(this.localStorageService.get("token")){
      return true;
    }else{
      return false;
    }
  }

}
