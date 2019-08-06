import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {JwtInfoModel} from '../models/jwt-info.model';
import { ReturnStatement } from '@angular/compiler';

@Injectable( {providedIn: 'root'} )
export class TokenService {
  private jwtToken: string;
  public tokenInfo: JwtInfoModel;

  constructor() {
    this.jwtToken = localStorage.getItem('jwtToken');
    this.tokenInfo = this.jwtToken != null ? jwt_decode(this.jwtToken) as JwtInfoModel : null;
  }

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

  public isTokenPresent(): boolean {
    return this.jwtToken != null;
  }

  public eraseToken(): void {
    this.jwtToken = null;
    this.tokenInfo = null;
    localStorage.removeItem('jwtToken');
  }

  public getToken(): JwtInfoModel {
    return this.tokenInfo;
  }
}
