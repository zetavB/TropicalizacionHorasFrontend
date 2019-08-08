
export interface Activity {
  fecha: string;
  horas: number;
  estado: number;
  categoria: {nombre: string};
  proyecto: {nombre: string};
}