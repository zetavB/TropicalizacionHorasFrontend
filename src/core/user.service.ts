import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estudiante } from '../models/estudiante.model';
import { CustomResponse } from '../models/custom-response.model';
import {catchError, map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  private url =  environment.serverUrl + '/estudiante/';

  projectToStringArray(projects) {
    const array: string[] = [];
    projects.forEach(
      project => array.push(project.nombre.toString())
    );
    return array;
  }

  getResponse(id: string): Observable<Estudiante> {
    return this.http.get<CustomResponse>(this.url + id).pipe(
      map(
        response => {
          const projectsArray = this.projectToStringArray(response.response.proyectos);
          const estudiante: Estudiante = {
            tipo: response.response.tipo,
            estado: response.response.estado,
            horasTotales: response.response.horasTotales,
            proyectos: projectsArray,
            fechaFinal: response.response.fechaFinal,
            fechaInicio: response.response.fechaInicio,
            carne: response.response.carne,
            usuario: response.response.usuario,
          };
          console.log(response);
          return estudiante;
        }
    ));
  }
}
