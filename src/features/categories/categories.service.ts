import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomResponse} from '../../models/custom-response.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class CategoriesService {
  private resourceURL = environment.serverUrl + '/categoria';

  constructor(private httpClient: HttpClient) { }

  public getCategories(): Observable<string[]> {
    return this.httpClient.get<CustomResponse>(this.resourceURL).pipe(
      map((resp: CustomResponse) => resp.response as string[])
    );
  }

  public addCategory(catName: string): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(this.resourceURL, {nombre: catName});
  }

  public deleteCategory(catName: string): Observable<CustomResponse> {
    return this.httpClient.delete<CustomResponse>(this.resourceURL + '/' + catName);
  }
}
