import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.css']
})
export class SideFilterComponent implements OnInit {
  brands:Brand[]=[];
  colors:Color[]=[];
  filtersForm:FormGroup
  
  constructor(
    private router:Router,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.createFiltersForm();
    this.getBrands();
    this.getColors();
  }

  applyFilters(){
    if(this.filtersForm.valid){
      let obj = Object.assign({}, this.filtersForm.value)
      this.router.navigate([''], { queryParams: { 
        brand: obj.brandOption,
        color: obj.colorOption
        } });      
    }else{
      this.toastrService.error("Something Wrong!!!")
    }
  }

  createFiltersForm(){
    this.filtersForm = this.formBuilder.group({
      brandOption:new FormControl(this.brands),
      colorOption:new FormControl(this.colors),
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

}
