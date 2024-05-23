import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleDetail } from '../../../model/vehicleDetail';
import { debounceTime, from } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-vehicle-filter',
  templateUrl: './vehicle-filter.component.html',
  styleUrl: './vehicle-filter.component.scss',
})
export class VehicleFilterComponent implements OnInit {
  public makeSelected: string[] = [];
  public modelSelected: string[] = [];
  public yearSelected: number[] = [];
  public makes: any = [];
  public models: any = [];
  public years: any = [];
  public gridAPIs = Array<GridApi>;
  public filteredVehicles: VehicleDetail[] = [];
  public updatableFilteredVehicles: VehicleDetail[] = [];
  public allNotes: string = '';
  public selectedAlltrims: boolean = false;
  public filteredVehicleMakes: any[] = [];

  constructor(private vehicleSvc: VehicleService, private modelSvc: NgbModal) {}

  ngOnInit(): void {
    this.getMakes();
    this.getModel();
    this.getYear();
  }
  onAccordionPanelChange() {
    this.selectAlltrims();
  }
  selectAlltrims() {
    let makes = document.querySelectorAll(
      '.makeClass'
    ) as NodeListOf<HTMLInputElement>;
    makes.forEach((s) => (s.checked = this.selectedAlltrims));

    const checkboxes = document.querySelectorAll(
      '[id^="rowId"]'
    ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((s) => (s.checked = this.selectedAlltrims));
  }
  onAllNotesChange(event: Event) {
    let text = event.target as HTMLInputElement;
    this.filteredVehicles.forEach((s) => (s.notes = text.value));
    return false;
  }
  getMakes() {
    this.vehicleSvc.getMakes().subscribe(
      (res) => {
        this.makes = res;
      },
      (error) => {}
    );
  }

  getYear() {
    this.vehicleSvc.getYears().subscribe(
      (res) => {
        this.years = res;
      },
      (error) => {}
    );
  }

  getModel() {
    this.vehicleSvc.getModels().subscribe(
      (res) => {
        this.models = res;
      },
      (error) => {}
    );
  }

  onYearSelectedChange(event: any) {
    if (this.makeSelected.length > 0 && this.modelSelected.length > 0)
      this.getFilteredVehicle();
  }
  onModelSelectedChange(event: any) {
    if (this.makeSelected.length > 0 && this.yearSelected.length > 0)
      this.getFilteredVehicle();
  }
  onMakeSelectedChange(event: any) {
    if (this.yearSelected.length > 0 && this.modelSelected.length > 0)
      this.getFilteredVehicle();
  }
  makeChkChange(data: any, event: Event) {
    let el = event.target as HTMLInputElement;
    this.filteredVehicleMakes.filter((s) => s.make == data.make)[0].checked =
      el.checked;

    if (el.checked) {
      const checkboxes = document.querySelectorAll(
        '.dynamicgrids .' + data.make + ' input[type="checkbox"]'
      ) as NodeListOf<HTMLInputElement>;

      checkboxes.forEach((checkbox: HTMLInputElement) => {
        if (!checkbox.checked) {
          checkbox.checked = true;
        }
      });
    }

    return false;
  }
  getVehichleChecked(make: any) {
    return this.filteredVehicleMakes.filter((s) => s.make == make)[0].checked;
  }
  getFilteredVehicle() {
    const combinations: { make: string; model: string; year: number }[] = [];

    for (const make of this.makeSelected) {
      for (const model of this.modelSelected) {
        for (const year of this.yearSelected) {
          combinations.push({ make, model, year });
        }
      }
      from([combinations])
        .pipe(
          debounceTime(300) // 300ms debounce time
        )
        .subscribe((combinations) => {
          this.vehicleSvc.getVehicleDataList(combinations).subscribe(
            (res: VehicleDetail[]) => {
              this.filteredVehicleMakes = Array.from(
                new Set(res.map((s) => s.make))
              ).map((make) => ({
                make: make,
                checked: false,
              }));
              this.filteredVehicles = res;
            },
            (error) => {}
          );
        });
    }
  }
  getRowId(vehicleDetailId: any) {
    return 'rowId' + vehicleDetailId.toString();
  }

  public getVehiclesByMake(make: any) {
    debugger;
    return this.filteredVehicles.filter((s) => s.make === make);
  }

  saveNotes() {
    debugger;
    let ids: string[] = [];
    const checkboxes = document.querySelectorAll(
      '[id^="rowId"]'
    ) as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((checkbox: HTMLInputElement) => {
      if (checkbox.checked) {
        ids.push(checkbox.id.replace('rowId', ''));
        return;
      }
    });

    if (!this.allNotes) {
      this.updatableFilteredVehicles = this.updatableFilteredVehicles.filter(
        (s) => {
          return ids.includes(s.vehicleDetailId.toString());
        }
      );
    } else {
      this.updatableFilteredVehicles = this.filteredVehicles;
    }
    debugger;
    this.vehicleSvc.saveNotes(this.updatableFilteredVehicles).subscribe(
      (res) => {
        this.years = res;
      },
      (error) => {}
    );

    return false;
  }

  onNotesChange(data: Event) {
    let element = data.target as HTMLInputElement;

    if (element) {
      const tableRow = element.closest('tr');
      if (tableRow) {
        const firstTdText = tableRow
          .querySelector('td:first-child')
          ?.textContent?.trim();

        if (firstTdText) {
          let row = this.filteredVehicles.filter(
            (s) => s.vehicleDetailId == Guid.parse(firstTdText)
          )[0];
          row.notes = element.value;
          this.updatableFilteredVehicles.push(row);
        }
      }
    }
  }

  onPreviewClick() {
    window.open('vehicle/list', '_blank');
  }
}
