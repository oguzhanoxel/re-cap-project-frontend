import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  searchForm: FormGroup
  currentUser:User

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.createSeachForm();
    this.getCurrentUser;
  }

  createSeachForm(){
    this.searchForm = this.formBuilder.group({
      searchText:[]
    });
  }

  search(){
    if(this.searchForm.valid){
      let obj = Object.assign({},this.searchForm.value)
      this.router.navigate([''], { queryParams: { 
        search: obj.searchText
       } });
    }else{
      this.toastrService.error("Something wrongs")
    }
  }

  isAuthenticated(){
    return this.authService.isAutheticated()
  }

  getCurrentUser(){
    return this.localStorageService.get('user')
  }

  logout(){
    this.authService.logout()
    this.router.navigate([''])
  }
}
