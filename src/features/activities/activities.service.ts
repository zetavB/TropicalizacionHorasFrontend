import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CustomResponse} from '../../models/custom-response.model';
import {catchError, map} from 'rxjs/operators';
import { Activity } from 'src/models/activity.model';


@Injectable()
export class ActivitiesService {

  constructor(private http: HttpClient) {}

  private ACTIVITY_URL =  environment.serverUrl + '/actividad';
  private CATEGORY_URL =  environment.serverUrl + '/categoria';

  getActivities(id: string): Observable<Activity[]> {
    return this.http.get<CustomResponse>(this.ACTIVITY_URL + '?correo=' + id).pipe(
      map(
        response => {
          const actividad: Activity[] = [];
          response.response.forEach(activity => {
            actividad.push(activity);
          });
          console.log(actividad);
          return actividad;
        }
    ));
  }

  postActivity(activity: Activity): Observable<Activity> {
    console.log(activity);
    return this.http.post<Activity>(this.ACTIVITY_URL, activity).pipe(
      catchError(this.handleError)
    );
  }

  deleteActivity(email: string, id: number) {
    return this.http.delete<Activity>(this.ACTIVITY_URL + '/' + email + '/' + id).pipe(
      catchError(this.handleError)
    );
  }

  getCategories(): Observable<[]> {
    return this.http.get<CustomResponse>(this.CATEGORY_URL).pipe(
      map(
        response => {
          return response.response;
        }
    ));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
