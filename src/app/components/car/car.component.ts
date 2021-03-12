import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carDetailsDto:CarDetailDto[]=[];
  dataLoaded = false;
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getDetails();
  }
  getDetails(){
    this.carService.getDetails().subscribe(response=>{
      this.carDetailsDto = response.data;
      this.dataLoaded = true;
    });
  }
}
