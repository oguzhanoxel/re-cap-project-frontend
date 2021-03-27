import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  car:Car;
  cars:CarDetailDto[]=[];
  brands:Brand[]=[];
  colors:Color[]=[];

  brandAddForm:FormGroup
  colorAddForm:FormGroup
  carAddForm:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
  ) { }

  ngOnInit(): void {
    this.getCars();
    this.getBrands();
    this.getColors();
    
    this.createBrandAddForm();
    this.createColorAddForm();
    this.createCarAddForm();
  }

  getCars(){
    this.carService.getDetails().subscribe(response=>{
      this.cars = response.data;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name:["",Validators.required],
    });
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name:["",Validators.required],
    });
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      name: ["",Validators.required],
      brandID: new FormControl(this.brands),
      colorID: new FormControl(this.colors),
      modelYear: ["",Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  addBrand(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(brandModel.name + " added.")
        this.getBrands();
        this.brandAddForm.reset()
      }, responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i = 0; i < responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
          }
        }
      });
    }else{
      this.toastrService.warning("Empty Field", "!!!")
    }
  }
  
  addColor(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success(colorModel.name + " added.")
        this.getColors();
        this.colorAddForm.reset()
      }, responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i = 0; i < responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
          }
        }
      });
    }else{
      this.toastrService.warning("Empty Field", "!!!")
    }
  }

  addCar(){
    if(this.carAddForm.valid){
      let carModal = Object.assign({}, this.carAddForm.value)
      this.carService.add(carModal).subscribe(response=>{
        this.toastrService.success(carModal.name + " added.")
        this.getCars();
        this.carAddForm.reset()
      }, responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i = 0; i < responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
          }
        }
      });
    }else{
      this.toastrService.warning("Empty Field", "!!!")
    }
  }

  deleteBrand(brand:Brand){
    if(confirm("Are you sure you want to delete '" + brand.name + "'")){
      this.brandService.delete(brand).subscribe(response =>{
        this.toastrService.info(brand.name + " deleted.")
        this.getBrands();
      });
    }
  }

  deleteColor(color:Color){
    if(confirm("Are you sure you want to delete '" + color.name + "'")){
      this.colorService.delete(color).subscribe(response =>{
        this.toastrService.info(color.name + " deleted.")
        this.getColors();
      });
    }
  }

  deleteCar(carId:number){
    this.carService.getCarById(carId).subscribe(response =>{
      this.car = response.data
    });
    if(confirm("Are you sure you want to delete '" + this.car.name + "'")){
      this.carService.delete(this.car).subscribe(response=>{
        this.toastrService.info(this.car.name + " deleted.")
        this.getCars();
      });
    }
  }
}
