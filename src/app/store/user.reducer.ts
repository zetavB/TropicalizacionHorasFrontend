import { Actions, UserActionTypes } from './user.actions';

const initialState = {
  email: 'estudiante1@estudiante.com',
  rol: 'Estudiante'
};

export function userReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER : {
      return {
        ...state,
        email: action.payload.email,
        rol: action.payload.rol
      };
    }
    case UserActionTypes.REMOVE_USER : {
      return {
        ...state,
        email: ''
      };
    }
    default: {
      return state;
    }
  }
}
