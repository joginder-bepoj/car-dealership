import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './dealerships/cars/cars.component';
import { DealershipComponent } from './dealerships/dealerships.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dealership',
    pathMatch: 'full'
  },
  {
    path: 'dealership',
    component: DealershipComponent,
  },
  {
    path: 'dealership/:id',
    component: CarsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
