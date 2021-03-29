import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { CarImageFile } from 'src/app/models/carImageFile';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.css']
})
export class ImgListComponent implements OnInit {
  apiUrl = "https://localhost:44348/"
  carImages:CarImage[]=[];
  addImageForm:FormGroup;
  currentCarId:number;
  currentFile:File | null = null;

  constructor(
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService,
  ) { }

  ngOnInit(): void {
    this.createAddImageForm();
    this.activatedRoute.params.subscribe(params=>{
      this.getCarImages(params["carId"]);
      this.currentCarId = params["carId"];
    })
  }

  onFileChange(event:any){
    if (event.target.files.length > 0) {
      this.currentFile = event.target.files[0];
    }
  }

  addImage(carId:number){
    if(this.currentFile){
      const formData = new FormData();
      formData.append('carID', carId.toString())
      formData.append('file', this.currentFile)
      this.carImageService.add(formData).subscribe( response => {
        this.toastrService.success("image added.")
        this.getCarImages(carId)
        this.addImageForm.reset()
      }, responseError => {
        if(responseError.error.Errors.length>0){
          for(let i = 0; i < responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
          }
        }
      })
    }
  }

  deleteImage(carImage:CarImage){
    this.carImageService.delete(carImage).subscribe(response=>{
      this.toastrService.info("image deleted")
      this.getCarImages(carImage.carID)
    });
  }
  
  getCarImages(id:number){
    this.carImageService.getCarImages(id).subscribe(response=>{
      this.carImages = response.data;
    });  
  }

  createAddImageForm(){
    this.addImageForm = this.formBuilder.group({
      file: ["", Validators.required],
    });
  }
}
