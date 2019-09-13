import {ProfileActions, ProfileActionTypes} from './profile.actions';
import {Estudiante} from '../../../models/entities/estudiante.model';

export interface ProfileState {
  estudiante: Estudiante;
  error: string;
}

const initialState: ProfileState = {
  estudiante: null,
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

    default:
      return state;
  }
}
