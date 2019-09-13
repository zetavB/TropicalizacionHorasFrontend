import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CustomResponse} from '../../models/custom-response.model';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ProjectModel} from '../../models/entities/project.model';

@Injectable()
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}

  public getAllProjects(): Observable<ProjectModel[]> {
    return this.httpClient.get<CustomResponse>(environment.serverUrl + '/proyecto?pagina=0&limite=5').pipe(
        map((resp: CustomResponse) => resp.response.content as ProjectModel[])
      );
  }

  createProject(project: ProjectModel): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(environment.serverUrl + '/proyecto', project);
  }
}
