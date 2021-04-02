import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      confirmPassword:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = this.registerForm.value;
      console.log(registerModel)
      if(registerModel['password'] !== registerModel['confirmPassword']){
        this.toastrService.warning("Please enter the same value again.", "Confirm Password")
      }else{
        this.authService.register(registerModel).subscribe(response=>{
          this.toastrService.success("Welcome " + registerModel['firstName'])
          this.router.navigate([""])
        }, responseError => {
          console.log(responseError)
        })
      }
    }
  }
}
