import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:CarDetailDto[]=[];
  dataLoaded = false;
  temp:any;
  filterText = "";
  filtersText: string[];
  constructor(
      private carService:CarService,
      private dataService:DataService,
      private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCars();
      }
    });

    if(!this.filterText){
      this.setFilterText();
    }
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

  setFilterText(){
    this.dataService.currentMessage.subscribe(data => this.temp = data)
  }
}
