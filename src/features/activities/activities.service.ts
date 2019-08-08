import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CustomResponse} from '../../models/custom-response.model';
import {catchError, map} from 'rxjs/operators';
import { Activity } from 'src/models/activity.model';

@Injectable()
export class ActivitiesService {

  constructor(private http: HttpClient) {}

  private url =  environment.serverUrl + '/actividad'; 

  getActivities(id: string): Observable<Activity[]> {
    return this.http.get<CustomResponse>(this.url + '?correo=' + id).pipe(
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
}
