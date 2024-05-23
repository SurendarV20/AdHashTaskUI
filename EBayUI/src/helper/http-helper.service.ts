import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpHelperService {
  constructor(private authSvc: AuthService, private http: HttpClient) {}
  private getHeader() {
    let h: any = {};

    if (this.authSvc.AuthData.IsAuthenticated) {
      h['Authorization'] = 'Bearer ' + this.authSvc.AuthData.Token;
    }

    const headers = { headers: new HttpHeaders(h) };
    return headers;
  }

  get<T>(url: string, params: any = null) {
    params = new HttpParams({ fromObject: this.sanitizeObject(params) });
    return this.http.get<T>(url, { ...this.getHeader(), params });
  }

  post<T>(url: string, data: any, params: any = null) {
    params = new HttpParams({ fromObject: this.sanitizeObject(params) });
    return this.http.post<T>(url, data, { ...this.getHeader(), params });
  }

  delete<T>(url: string) {
    return this.http.delete<T>(url, this.getHeader());
  }

  sanitizeObject(obj: any) {
    if (obj == null) {
      return {};
    }

    const result: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value !== null) {
        result[key] = value;
      }
    }
    return result;
  }
}
