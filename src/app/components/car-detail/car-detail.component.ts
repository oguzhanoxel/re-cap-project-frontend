import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car:CarDetailDto;
  carImages:CarImage[] = [];
  apiUrl = "https://localhost:44348/"

  constructor(
    private carService:CarService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCar(params["carId"])
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
}
