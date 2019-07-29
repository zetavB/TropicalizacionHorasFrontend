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
          return new Estudiante(
            response.response.tipo,
            response.response.estado,
            response.response.horasTotales,
            response.response.proyectos,
            response.response.fechaFinal,
            response.response.fechaInicio,
            response.response.usuario,
          );
        })
    );
  }
}
