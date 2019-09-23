import {Estudiante} from '../../../../models/entities/estudiante.model';

export interface StudentToAddModel {
  student: Estudiante;
  selected: boolean;
}
