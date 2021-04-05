import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  rentals:Rental[]=[];

  updateFullNameForm:FormGroup
  updateEmailForm:FormGroup
  updatePasswordForm:FormGroup

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private rentalService:RentalService,
    private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getRentals();
    this.createUpdateFullName();
    this.createUpdateEmail();
    this.createUpdatePassword();
  }

  createUpdateFullName(){
    this.updateFullNameForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    });
  }
  
  createUpdateEmail(){
    this.updateEmailForm = this.formBuilder.group({
      email:["",Validators.required]
    })
  }
  
  createUpdatePassword(){
    this.updatePasswordForm = this.formBuilder.group({
      password1:["",Validators.required],
      password2:["",Validators.required]
    })
  }

  updateFullName(){
    if(this.updateFullNameForm.valid){
      let formModel = this.updateFullNameForm.value
      let userModel:User = {
        id:this.user.id,
        firstName:formModel.firstName,
        lastName:formModel.lastName,
        email:this.user.email,
        passwordHash:this.user.passwordHash,
        passwordSalt:this.user.passwordSalt,
        status:this.user.status
      }
      this.userService.update(userModel).subscribe(response=>{
        this.toastrService.success("Need Relogin", "Name Changed")
        this.authService.logout();
      })
    }
  }

  updateEmail(){
    if(this.updateEmailForm.valid){
      let formModel = this.updateEmailForm.value
      let userModel:User = {
        id:this.user.id,
        firstName:this.user.firstName,
        lastName:this.user.lastName,
        email:formModel.email,
        passwordHash:this.user.passwordHash,
        passwordSalt:this.user.passwordSalt,
        status:this.user.status
      }
      this.userService.update(userModel).subscribe(response=>{
        this.toastrService.success("Need Relogin", "E-mail Changed")
        this.authService.logout();
      })
    }
  }

  updatePassword(){
    console.log(this.updatePasswordForm.value)
  }

  getUser(){
    this.user = this.localStorageService.get("user")
  }

  getRentals(){
    this.rentalService.getRentalsByUserId(this.user.id).subscribe(response=>{
      this.rentals = response.data
    })
  }
}
