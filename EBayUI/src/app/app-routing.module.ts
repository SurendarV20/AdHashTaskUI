import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleIndexComponent } from './vehicle/vehicle-index/vehicle-index.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'vehicle',
    loadChildren: () =>
      import('../app/vehicle/vehicle.module').then((m) => m.VehicleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
