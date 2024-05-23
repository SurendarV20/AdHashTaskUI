import { Guid } from 'guid-typescript';

export class VehicleDetail {
  vehicleDetailId: Guid = Guid.createEmpty();
  make: string = '';
  model: string = '';
  year: number = 0;
  status: number = 0;
  trim: string = '';
  engine: string = '';
  notes: string = '';
}
