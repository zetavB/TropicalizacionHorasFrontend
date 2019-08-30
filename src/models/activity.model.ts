export interface Activity {
  idGenerado: number;
  fecha: string;
  horas: number;
  estado: string;
  categoria: {nombre: string};
  proyecto: {nombre: string};
  estudiante: {usuario: {correo: string}};
  detalles: string;
}
