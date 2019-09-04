import { Usuario } from './usuario.model';

export interface Estudiante {
    tipo: string;
    estado: string;
    horasTotales: number;
    diasRestantes: number;
    proyectos: {nombre: string}[];
    fechaFinal: string;
    fechaInicio: string;
    carne: string;
    usuario: Usuario;
}
