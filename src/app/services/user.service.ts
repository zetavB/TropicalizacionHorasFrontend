import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estudiante } from '../models/estudiante.model';
import { Response } from '../models/response.model'; 
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  private url = 'http://localhost:8080/estudiante/';
  // private response: Response;

  getResponse(id: string): Observable<Estudiante> {
    return this.http.get<Response>(this.url + id).pipe(
      map(
        response => {
          const estudiante: Estudiante = {
            tipo: response.response.tipo,
            estado: response.response.estado,
            horasTotales: response.response.horasTotales,
            proyectos: response.response.proyectos,
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
