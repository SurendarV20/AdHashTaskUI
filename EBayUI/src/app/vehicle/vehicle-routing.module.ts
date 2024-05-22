import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleIndexComponent } from './vehicle-index/vehicle-index.component';
import { VehicleFilterComponent } from './vehicle-filter/vehicle-filter.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleIndexComponent,
    children: [
      {
        path: 'filter',
        component: VehicleFilterComponent,
      },
      {
        path: 'list',
        component: VehicleListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {}
