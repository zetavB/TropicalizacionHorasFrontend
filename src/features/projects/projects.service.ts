import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CustomResponse} from '../../models/custom-response.model';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ProjectModel} from '../../models/entities/project.model';
import {Estudiante} from '../../models/entities/estudiante.model';

@Injectable()
export class ProjectsService {
  resourceURL = environment.serverUrl + '/proyecto';

  constructor(private httpClient: HttpClient) {}

  public getAllProjects(): Observable<ProjectModel[]> {
    return this.httpClient.get<CustomResponse>(this.resourceURL + '?pagina=0&limite=5').pipe(
        map((resp: CustomResponse) => resp.response.content as ProjectModel[])
      );
  }

  createProject(project: ProjectModel): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(this.resourceURL, project);
  }

  changeDescription(project: ProjectModel): Observable<CustomResponse> {
    return this.httpClient.put<CustomResponse>(this.resourceURL + '/' + project.nombre, project.descripcion);
  }

  getProjectStudents(projectName: string): Observable<Estudiante[]> {
    return this.httpClient.get<CustomResponse>(this.resourceURL + '/' + projectName + '/estudiantes' + + '?pagina=0&limite=5').pipe(
      map((resp: CustomResponse) => resp.response as Estudiante[])
    );
  }
}
