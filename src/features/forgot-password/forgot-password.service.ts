import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CustomResponse} from '../../models/custom-response.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RetrievePasswordModel} from '../../models/retrieve-password.model';

@Injectable()
export class ForgotPasswordService {
  constructor(private httpClient: HttpClient) {}

  public requestToken(email: string): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(environment.serverUrl + '/autenticar/recuperar/' + email, '');
  }

  public changePassword(model: RetrievePasswordModel): Observable<CustomResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.put<CustomResponse>(environment.serverUrl + '/autenticar/recuperar', model, {headers});
  }
}
