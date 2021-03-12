import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentalDetailsDto:RentalDetailDto[] = [];
  dataLoaded = false;

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(){
    this.rentalService.getDetails().subscribe(response=>{
      this.rentalDetailsDto = response.data;
      this.dataLoaded = true;
    });
  }
}
