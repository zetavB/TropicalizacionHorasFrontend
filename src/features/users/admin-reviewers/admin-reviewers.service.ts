import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../../../models/Page';
import {Estudiante} from '../../../models/entities/estudiante.model';
import {CustomResponse} from '../../../models/custom-response.model';
import {map} from 'rxjs/operators';
import {Activity} from '../../../models/entities/activity.model';
import {ReviewerModel} from '../../../models/entities/reviewer.model';

@Injectable({
  providedIn: 'root'
})
export class AdminReviewersService {
  constructor(private httpClient: HttpClient) { }

  private resourceURL = environment.serverUrl + '/revisor';

  public getReviewers(pageSize: number, pageNumber: number): Observable<Page<ReviewerModel>> {
    return this.httpClient.get<CustomResponse>(this.resourceURL
      + '?pagina=' + pageNumber + '&limite=' + pageSize).pipe(
      map((resp: CustomResponse) => resp.response as Page<ReviewerModel>)
    );
  }

  public addReviewer(reviewer: ReviewerModel): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(this.resourceURL, reviewer);
  }

  public editReviewer(changedReviewer: ReviewerModel): Observable<CustomResponse> {
    return this.httpClient.put<CustomResponse>(this.resourceURL + '/' + changedReviewer.usuario.correo, changedReviewer);
  }

  public deleteReviewer(reviewerEmail: string): Observable<CustomResponse> {
    return this.httpClient.delete<CustomResponse>(this.resourceURL + '/' + reviewerEmail);
  }
}
