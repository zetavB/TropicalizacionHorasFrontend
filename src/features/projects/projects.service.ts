import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CustomResponse} from '../../models/custom-response.model';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ProjectModel} from '../../models/entities/project.model';
import {Estudiante} from '../../models/entities/estudiante.model';
import {Page} from '../../models/Page';

@Injectable()
export class ProjectsService {
  resourceURL = environment.serverUrl + '/proyecto';

  constructor(private httpClient: HttpClient) {}

  public getAllProjects(page: number, limit: number): Observable<Page<ProjectModel>> {
    return this.httpClient.get<CustomResponse>(this.resourceURL
      + '?pagina=' + page + '&limite=' + limit).pipe(
        map((resp: CustomResponse) => resp.response as Page<ProjectModel>)
      );
  }

  createProject(project: ProjectModel): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(this.resourceURL, project);
  }

  changeDescription(project: ProjectModel): Observable<CustomResponse> {
    return this.httpClient.put<CustomResponse>(this.resourceURL + '/' + project.nombre, project.descripcion);
  }

  getProjectStudents(projectName: string, page: number, limit: number): Observable<Page<Estudiante>> {
    return this.httpClient.get<CustomResponse>(this.resourceURL + '/' + projectName + '/estudiantes'
      + '?pagina=' + page + '&limite=' + limit).pipe(
      map((resp: CustomResponse) => resp.response as Page<Estudiante>)
    );
  }

  getNotStudents(projectName: string, page: number, limit: number): Observable<Page<Estudiante>> {
    return this.httpClient.get<CustomResponse>(this.resourceURL + '/' + projectName + '/no-estudiantes'
      + '?pagina=' + page + '&limite=' + limit).pipe(
      map((resp: CustomResponse) => resp.response as Page<Estudiante>)
    );
  }
}
