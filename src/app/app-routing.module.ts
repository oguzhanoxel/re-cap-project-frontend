import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/:carId", component:CarDetailComponent},
  {path:"list", component:EntityListComponent}
  // {path:"cars/brands/:brandId", component:CarComponent},
  // {path:"cars/colors/:colorId", component:CarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
