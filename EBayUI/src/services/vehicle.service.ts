import { Injectable } from '@angular/core';
import { HttpHelperService } from '../helper/http-helper.service';
import { environment } from '../environments/environment';
import { VehicleDetail } from '../model/vehicleDetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private url!: string;

  constructor(private httpHelperSvc: HttpHelperService) {
    this.url = `${environment.ApiUrl}/vehicle`;
  }
  getMakes() {
    return this.httpHelperSvc.get(`${this.url}/make`);
  }

  getModels() {
    return this.httpHelperSvc.get(`${this.url}/model`);
  }

  getYears() {
    return this.httpHelperSvc.get(`${this.url}/year`);
  }

  importExcel() {
    return this.httpHelperSvc.get(`${this.url}/import`);
  }

  GetSearchResult(query: string): Observable<Array<VehicleDetail>> {
    return this.httpHelperSvc.get(`${this.url}/search/${query}`);
  }

  GetView(): Observable<Array<VehicleDetail>> {
    return this.httpHelperSvc.get(`${this.url}/view`);
  }

  getVehicleDataList(combinations: any) {
    return this.httpHelperSvc.post<VehicleDetail[]>(
      `${this.url}/vehicleDataList`,
      combinations
    );
  }

  saveNotes(data: VehicleDetail[]) {
    return this.httpHelperSvc.post<VehicleDetail[]>(
      `${this.url}/saveNotes`,
      data
    );
  }
}
