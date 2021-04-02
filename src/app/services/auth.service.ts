import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44348/api/"

  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
    private userService:UserService
  ) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let path = this.apiUrl + "auth/login"
    this.setCurrentUser(loginModel.email)
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, loginModel)
  }

  logout(){
    this.localStorageService.remove("token")
    this.localStorageService.remove("user")
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
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

  private setCurrentUser(email:string){
    this.userService.getByEmail(email).subscribe(response => {
      console.log(response.data)
      let user = response.data
      this.localStorageService.set("user", user)
    })
  }
}
