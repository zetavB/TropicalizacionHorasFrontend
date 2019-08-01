import { Actions, UserActionTypes } from './user.actions'; 

const initialState = {
  email: ''
};

export function userReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER : {
      return {
        ...state,
        email: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
