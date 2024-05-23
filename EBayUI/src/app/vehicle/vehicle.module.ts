import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleIndexComponent } from './vehicle-index/vehicle-index.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VehicleFilterComponent } from './vehicle-filter/vehicle-filter.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';

@NgModule({
  declarations: [
    VehicleIndexComponent,
    VehicleFilterComponent,
    VehicleListComponent,
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    AgGridAngular,
    NgbModule,
  ],
  exports: [VehicleIndexComponent],
})
export class VehicleModule {}
