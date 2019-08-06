import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {JwtInfoModel} from '../models/jwt-info.model';

@Injectable( {providedIn: 'root'} )
export class TokenService {

  constructor() {}

  public static decodeToken(token: string): JwtInfoModel {
    return jwt_decode(token) as JwtInfoModel;
  }

  saveJwtToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  public isTokenPresent(): boolean {
    return localStorage.getItem('jwtToken') != null;
  }

  public eraseToken(): void {
    localStorage.removeItem('jwtToken');
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }
}
