import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { User } from 'src/app/models/user';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  user:User=this.localStorageService.get("user")
  car:CarDetailDto;
  carImages:CarImage[] = [];
  apiUrl = "https://localhost:44348/"
  rentalAddForm:FormGroup
  rental:Rental

  constructor(
    private carService:CarService,
    private carImageService:CarImageService,
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCar(params["carId"])
      this.setRental(params["carId"])
      this.createRentalAddForm(params["carId"])
      this.getCarImages(params["carId"])
    });
  }

  getCar(id:number){
    this.carService.getDetail(id).subscribe(response=>{
      this.car = response.data;
    });
  }
  
  getCarImages(id:number){
    this.carImageService.getCarImages(id).subscribe(response=>{
      this.carImages = response.data;
    });  
  }

  // RENT begin

  getDate(day:number){
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0,10)
  }

  setRental(carId:number){
    this.rentalService.getByCar(carId).subscribe(response=>{
      this.rental = response.data
      console.log(response.data)
      console.log(this.rental)
    })
  }

  createRentalAddForm(carId:number){
    this.rentalAddForm = this.formBuilder.group({
      carID:carId,
      userID:this.user.id,
      rentDate: ["", Validators.required],
      returnDate:["", Validators.required]
    })
  }

  rent(){
    if(this.rentalAddForm.valid){
      let rentalModel:Rental = this.rentalAddForm.value
      if(rentalModel.rentDate >= rentalModel.returnDate){
        this.toastrService.warning("Wrong date", "!!!")
      }else{
        this.localStorageService.set("rental", rentalModel)
        this.localStorageService.set("car", this.car)
        this.router.navigate(["payment"])
      }
    }
  }

  isRentable():boolean{
    if(this.rental){
      return false
    }else{
      return true
    }
  }

  // RENT end

}
