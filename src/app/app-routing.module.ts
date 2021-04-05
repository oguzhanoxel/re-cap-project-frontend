import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { ImgListComponent } from './components/img-list/img-list.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/:carId", component:CarDetailComponent},
  {path:"cars/images/:carId", component:ImgListComponent},
  {path:"list", component:EntityListComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"payment", component:PaymentComponent},
  {path:"profile", component:ProfileComponent},
  // {path:"cars/brands/:brandId", component:CarComponent},
  // {path:"cars/colors/:colorId", component:CarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
