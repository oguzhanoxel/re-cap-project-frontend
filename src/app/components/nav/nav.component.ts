import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  searchForm: FormGroup

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.createSeachForm();
  }

  createSeachForm(){
    this.searchForm = this.formBuilder.group({
      searchText:[]
    });
  }

  search(){
    if(this.searchForm.valid){
      let obj = Object.assign({},this.searchForm.value)
      this.router.navigate([''], { queryParams: { 
        search: obj.searchText
       } });
    }else{
      this.toastrService.error("Something wrongs")
    }
  }
}
