import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Estudiante} from '../../../models/entities/estudiante.model';
import {CustomResponse} from '../../../models/custom-response.model';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Activity} from '../../../models/entities/activity.model';
import {Page} from '../../../models/Page';

@Injectable()
export class AdminStudentsService {

  constructor(private httpClient: HttpClient) { }

  private resourceURL = environment.serverUrl + '/estudiante';

  public getStudents(pageSize: number, pageNumber: number): Observable<Page<Estudiante>> {
    return this.httpClient.get<CustomResponse>(this.resourceURL
      + '?pagina=' + pageNumber + '&limite=' + pageSize).pipe(
      map((resp: CustomResponse) => resp.response as Page<Estudiante>)
    );
  }

  public getStudentActivities(studentEmail: string, pageSize: number, pageNumber: number): Observable<Page<Activity>> {
    return this.httpClient.get<CustomResponse>(this.resourceURL + '/' + studentEmail + '/actividad'
      + '?pagina=' + pageNumber + '&limite=' + pageSize).pipe(
      map((resp: CustomResponse) => resp.response as Page<Activity>)
    );
  }

  public addStudent(student: Estudiante): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(this.resourceURL, student);
  }

  public editStudent(changedStudent: Estudiante): Observable<CustomResponse> {
    return this.httpClient.put<CustomResponse>(this.resourceURL + '/' + changedStudent.usuario.correo, changedStudent);
  }

  public deleteStudent(studentEmail: string): Observable<CustomResponse> {
    return this.httpClient.delete<CustomResponse>(this.resourceURL + '/' + studentEmail);
  }

  editProjects(email: string, projects: string[]) {
    return this.httpClient.put<CustomResponse>(this.resourceURL + '/proyectos/' + email, projects);
  }
}
