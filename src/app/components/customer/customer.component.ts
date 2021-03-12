import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  
  customerDetailsDto:CustomerDetailDto[] = [];
  dataLoaded = false;

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(){
    this.customerService.getDetails().subscribe(response=>{
      this.customerDetailsDto = response.data;
      this.dataLoaded = true;
    });
  }
}
