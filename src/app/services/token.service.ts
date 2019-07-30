import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {JwtInfoModel} from '../models/jwt-info.model';

@Injectable( {providedIn: 'root'} )
export class TokenService {
  private jwtToken: string;
  public tokenInfo;

  constructor() {}

  setJwtToken(token: string): void {
    this.jwtToken = token;
    this.decodeToken();
    localStorage.setItem('jwtToken', this.jwtToken);
  }

  private decodeToken(): void {
    try {
      this.tokenInfo = jwt_decode(this.jwtToken) as JwtInfoModel;
      console.log(this.tokenInfo);
    } catch (Error) {
      return null;
    }
  }
}
