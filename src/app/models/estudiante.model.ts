import { Usuario } from './usuario.model';

export class Estudiante {
  constructor(
    tipo: string,
    estado: string,
    horasTotales: number,
    proyectos: [],
    fechaFinal: string,
    fechaInicio: string,
    usuario: Usuario,
  ) {}
}
