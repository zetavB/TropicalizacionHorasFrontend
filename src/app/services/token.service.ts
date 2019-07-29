import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable( {providedIn: 'root'} )
export class TokenService {
  private jwtToken: string;
  public tokenInfo;

  constructor() {}

  setJwtToken(token: string): void {
    this.jwtToken = token;
    this.decodeToken();
  }

  getJwtToken(): string {
    return this.jwtToken;
  }

  private decodeToken(): void {
    try {
      this.tokenInfo = jwt_decode(this.jwtToken);
      console.log(this.tokenInfo);
    } catch (Error) {
      return null;
    }
  }
}
