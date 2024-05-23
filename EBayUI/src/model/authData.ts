import { Guid } from 'guid-typescript';

export interface AuthData {
  UserName: string;
  IsAuthenticated: boolean;
  Token: string;
  ExpiryIn: number;
  Name: string;
  Roles?: Array<string>;
  IsAdmin?: boolean;
  IsEmployee?: boolean;
  Email: string;
}
