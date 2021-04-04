import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  user:User=this.localStorageService.get("user")
  car:CarDetailDto=this.localStorageService.get("car")
  rental:Rental=this.localStorageService.get("rental")

  paymentType:number;

  billingForm:FormGroup
  paymentForm:FormGroup

  constructor(
    private router:Router,
    private toastrService:ToastrService,
    private paymentService:PaymentService,
    private rentalService:RentalService,
    private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.createBillingForm();
    this.createPaymentForm();
  }

  createBillingForm(){
    this.billingForm = this.formBuilder.group({
      firstName:[this.user.firstName, Validators.required],
      lastName:[this.user.lastName, Validators.required],
      email:[this.user.email, Validators.required],
      address1:["", Validators.required],
      address2:[""],
    })
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      price:[this.calculateLastPrice(),Validators.required],
      name:["",Validators.required],
      creditCardNum:["",Validators.required],
      expiration:["",Validators.required],
      cvv:["",Validators.required]
    })
  }

  handleChange(num:number) {
    this.paymentType = num;
  }

  getRentLength(){
    var oneDay = 1000 * 3600 * 24
    var date1 = new Date(this.rental.rentDate.toString());
    var date2 = new Date(this.rental.returnDate.toString());
    var Difference_In_Time = date2.getTime() - date1.getTime();  
    var Difference_In_Days = Difference_In_Time / oneDay;
    return Difference_In_Days
  }

  calculateLastPrice(){
    return this.paymentService.calculateLastPrice(this.car.dailyPrice, this.getRentLength())
  }

  send(){

    if(this.billingForm.valid){
      let billingModel = this.billingForm.value
      console.log(billingModel) // billing için henüz database ve service yok
    }

    if(this.paymentForm.valid){
      let paymentModel = this.paymentForm.value
      let newModel = {
        price:paymentModel.price,
        name:paymentModel.name,
        creditCardNum:paymentModel.creditCardNum,
        expiration:paymentModel.expiration,
        cvv:paymentModel.cvv,
        paymentType:this.paymentType
      }

      if(this.paymentService.checkPayment(newModel)){
        let rentModel: Rental={
          id:0,
          userID:this.rental.userID,
          carID:this.car.id,
          rentDate:this.rental.rentDate,
          returnDate:this.rental.returnDate
        }
        console.log(rentModel)
        this.rentalService.add(rentModel).subscribe(response => {
          console.log(response)
        })
        this.toastrService.success("payment successfully")
        this.router.navigate([""])
      }else{
        this.toastrService.warning("payment failed. ", "!!!") //payment service hep true olduğu için çalışmayacakvir satır
      }
    }
  }
}
