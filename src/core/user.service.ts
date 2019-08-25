import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
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

  getStudent(id: string): Observable<Estudiante> {
    return this.http.get<CustomResponse>(this.url + id).pipe(
      map(response => {
        const projectsArray = this.projectToStringArray(response.response.proyectos);
        const estudiante: Estudiante = {
          tipo: response.response.tipo,
          estado: response.response.estado,
          horasTotales: response.response.horasTotales,
          diasRestantes: null,
          proyectos: projectsArray,
          fechaFinal: response.response.fechaFinal,
          fechaInicio: response.response.fechaInicio,
          carne: response.response.carne,
          usuario: response.response.usuario,
        };
        return estudiante;
      }),
      catchError((err: CustomResponse) => throwError(err))
    );
  }

  getDateDifference(latterDate: string) {
    const date1 = new Date();
    const date2 = new Date(latterDate);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
