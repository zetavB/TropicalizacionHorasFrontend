import {Injectable} from '@angular/core';
import {Observable, throwError, forkJoin } from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CustomResponse} from '../../models/custom-response.model';
import {catchError, map} from 'rxjs/operators';
import {Activity} from '../../models/entities/activity.model';


@Injectable()
export class ActivitiesService {

  constructor(private http: HttpClient) {}

  private ACTIVITY_URL = environment.serverUrl + '/actividad';
  private CATEGORY_URL = environment.serverUrl + '/categoria';
  private FILE_URL = environment.serverUrl + '/actividad/archivo';

  getActivities(email: string): Observable<Activity[]> {
    return this.http.get<CustomResponse>(this.ACTIVITY_URL + '?correo=' + email).pipe(
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

  getActivityDetails(id: number): Observable<{activity: Activity, files: []}> {
    const activity = this.http.get<CustomResponse>(this.ACTIVITY_URL + '/' + id).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
    const files = this.http.get<CustomResponse>(this.FILE_URL + '/' + id).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
    return forkJoin([activity, files]).pipe(
      map(
        response => {
          return {activity: response[0], files: response[1]};
        })
    );
  }

  postActivity(activity: Activity): Observable<number> {
    return this.http.post<CustomResponse>(this.ACTIVITY_URL, activity).pipe(
    map(response => {
      return response.response;
    }),
    catchError(this.handleError)
    );
  }

  modifyActivity(id: number, activity: Activity, filesToUpload: Set<File>, filesToRemove: string[]) {
    const activityResponse = this.http.put<CustomResponse>(this.ACTIVITY_URL + '/' + id, activity).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
    const filesToUploadResponse = this.uploadActivityFiles(id, filesToUpload).pipe(
      catchError(this.handleError)
    );
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: filesToRemove
    };
    const filesToRemoveResponse = this.http.delete<CustomResponse>(this.FILE_URL + '/' + id, options).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
    return forkJoin([activityResponse, filesToUploadResponse, filesToRemoveResponse]).pipe(
      map(
        response => {
          return {activity: response[0], files: response[1], filesRemoved: response[2]};
        })
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
    const formData = new FormData();
    files.forEach(file => {
    formData.append('files', file, file.name);
    });
    return this.http.post(this.FILE_URL + '/' + id, formData);
  }

  public separateActivityImages(files) {
    const imageURIs = [];
    const fileURIs = [];
    files.forEach(file => {
      if (file.image) {
        imageURIs.push(file);
      } else {
        fileURIs.push(file);
      }
    });
    return [imageURIs, fileURIs];
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
