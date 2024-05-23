import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleDetail } from '../../../model/vehicleDetail';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent implements OnInit {
  public gridOptions: GridOptions;
  gridApi: any;
  rows: any[] = [];
  query: string = '';

  constructor(private vehicleSvc: VehicleService) {
    this.gridOptions = {
      columnDefs: [],
      rowData: [],
      defaultColDef: {
        filter: true,
        sortable: true,
        resizable: true,
      },
    };
  }
  ngOnInit(): void {
    this.gridOptions.columnDefs = [
      {
        headerName: 'Make',
        field: 'make',
        flex: 1,
      },
      {
        headerName: 'Model',
        field: 'model',
        flex: 1,
      },
      {
        headerName: 'Year',
        field: 'year',
        flex: 1,
      },
      {
        headerName: 'Trim',
        field: 'trim',
        flex: 1,
      },
      {
        headerName: 'Engine',
        field: 'engine',
        flex: 1,
      },
      {
        headerName: 'Notes',
        field: 'notes',
        flex: 1,
      },
    ];
    this.getVehicleList();
  }

  getVehicleList() {
    this.vehicleSvc.GetView().subscribe(
      (res) => {
        this.rows = res;
        debugger;
      },
      (err) => {}
    );
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  GetSearchResult() {
    if (this.query && this.query.length >= 2) {
      this.vehicleSvc.GetSearchResult(this.query).subscribe(
        (res) => {
          this.rows = res;
          debugger;
        },
        (err) => {}
      );
    } else {
      this.getVehicleList();
    }
  }
}
