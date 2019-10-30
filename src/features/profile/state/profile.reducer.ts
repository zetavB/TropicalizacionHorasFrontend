import {ProfileActions, ProfileActionTypes} from './profile.actions';
import {Estudiante} from '../../../models/entities/estudiante.model';

export interface ProfileState {
  estudiante: Estudiante;
  pendingHours: number;
  error: string;
}

const initialState: ProfileState = {
  estudiante: null,
  pendingHours: 0,
  error: ''
};

export function reducer(state = initialState, action: ProfileActions): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.LoadSuccessful:
      return {
        ...state,
        estudiante: action.payload,
        error: ''
      };

    case ProfileActionTypes.LoadFailed:
      return {
        ...state,
        estudiante: null,
        error: action.payload
      };

    case ProfileActionTypes.LoadPendingHoursS:
      return {
        ...state,
        pendingHours: action.hours
      };

    default:
      return state;
  }
}
