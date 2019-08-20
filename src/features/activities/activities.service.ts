import {Injectable} from '@angular/core';
import {Observable, throwError, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpEventType, HttpRequest, HttpEvent} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CustomResponse} from '../../models/custom-response.model';
import {catchError, map} from 'rxjs/operators';
import { Activity } from 'src/models/activity.model';


@Injectable()
export class ActivitiesService {

  constructor(private http: HttpClient) {}

  private ACTIVITY_URL =  environment.serverUrl + '/actividad';
  private CATEGORY_URL =  environment.serverUrl + '/categoria';
  private FILE_URL =  environment.serverUrl + '/actividad/archivo/';

  getActivities(id: string): Observable<Activity[]> {
    return this.http.get<CustomResponse>(this.ACTIVITY_URL + '?correo=' + id).pipe(
      map(
        response => {
          const actividad: Activity[] = [];
          response.response.forEach(activity => {
            actividad.push(activity);
          });
          return actividad;
        }
    ));
  }

  postActivity(activity: Activity): Observable<number> {
    return this.http.post<CustomResponse>(this.ACTIVITY_URL, activity).pipe(
    map(response => {
      return response.response;
    }),
    catchError(this.handleError)
    );
  }

  deleteActivity(id: number) {
    return this.http.delete<CustomResponse>(this.ACTIVITY_URL + '/' + id).pipe(
    map(response => {
      return response.response;
    }),
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

  public uploadActivityFiles(id: number, files: Set<File>): Observable<Object> {
    console.log('uploading files');
    const formData = new FormData();
    files.forEach(file => {
    formData.append('files', file, file.name);
    });

    console.log(formData);
    const options = {
      reportProgress: true
    };

    // const req = new HttpRequest(
    //   'POST',
    //   this.FILE_URL + id,
    //   formData,
    //   {
    //     headers: new HttpHeaders({
    //       'Access-Control-Allow-Origin': '*'
    //     }),
    //     reportProgress: true
    //   }
    // );
    console.log(this.FILE_URL + id);
    return this.http.post(this.FILE_URL + id, formData);
    // return this.http.request(req);
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
      console.log(error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
