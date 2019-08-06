import { Actions, UserActionTypes } from './user.actions';

const initialState = {
  email: 'prueba@unmail.com'
};

export function userReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER : {
      return {
        ...state,
        email: action.payload
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
