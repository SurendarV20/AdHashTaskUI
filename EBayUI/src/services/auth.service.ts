import { Injectable } from '@angular/core';
import { AuthData } from '../model/authData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public AuthData: AuthData = {
    UserName: '',
    IsAuthenticated: false,
    Token: '',
    ExpiryIn: 0,
    Name: '',
    Email: '',
  };
  storageKey: string = 'Eb_Auth_Data';

  constructor() {
    this.readAuthDataFromStarage();
  }

  private readAuthDataFromStarage() {
    const data = sessionStorage.getItem(this.storageKey);

    if (data) {
      try {
        this.AuthData = JSON.parse(data);
      } catch (error) {}
    }
  }
}
