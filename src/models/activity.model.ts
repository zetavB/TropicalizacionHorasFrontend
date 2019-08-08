
export interface Activity {
  fecha: string;
  horas: number;
  estado: string;
  categoria: {nombre: string};
  proyecto: {nombre: string};
}