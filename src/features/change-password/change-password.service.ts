import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomResponse} from '../../models/custom-response.model';
import {environment} from '../../environments/environment';
import {ChangePasswordModel} from '../../models/change-password.model';

@Injectable()
export class ChangePasswordService {
  constructor(private httpClient: HttpClient) {}

  public changePassword(oldPass: string, newPass: string): Observable<CustomResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.put<CustomResponse>(environment.serverUrl + '/autenticar/cambiar-contrasenna',
      {
        contraVieja: oldPass,
        contraNueva: newPass
      } as ChangePasswordModel,
      {headers});
  }
}
