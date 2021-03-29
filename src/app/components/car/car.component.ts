import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:CarDetailDto[]=[];
  dataLoaded = false;
  temp:any;
  searchText = "";
  brandId:number;
  colorId:number;
  filtersText: string[];
  apiUrl = "https://localhost:44348/"
  constructor(
      private carService:CarService,
      private toastrService:ToastrService,
      private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(params["search"]){
        this.setSearchText(params["search"])
      }
      else if(params["brand"] || params["color"]){
        this.filterCars(params["brand"], params["color"])
      }
      else{
        this.getCars();
      }
    });
  }
  getCars(){
    this.carService.getDetails().subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId:number){
    this.carService.getDetailsByBrand(brandId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId:number){
    this.carService.getDetailsByBrand(colorId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  setSearchText(search:string){
    this.searchText = search
  }

  filterCars(brand:number, color:number){
    this.carService.getDetailsFilter(brand, color).subscribe(response=>{
      this.cars = response.data
      this.toastrService.info(this.cars.length + " results found")
    });
  }
}
