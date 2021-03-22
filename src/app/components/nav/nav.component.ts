import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  searchForm: FormGroup

  constructor(private formBuilder:FormBuilder, private dataService:DataService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createSeachForm();
  }

  createSeachForm(){
    this.searchForm = this.formBuilder.group({
      searchText:["",Validators.minLength(3)]
    });
  }

  search(){
    if(this.searchForm.valid){
      let obj = Object.assign({},this.searchForm.value)
      console.log(obj.searchText)
      this.dataService.changeMessage(obj.searchText)
    }else{
      this.toastrService.error("Something wrongs")
    }
  }
}
