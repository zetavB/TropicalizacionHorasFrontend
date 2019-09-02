import {ChangePasswordActions, ChangePasswordActionTypes} from './change-password.actions';

export interface ChangePasswordState {
  error: boolean;
  showSpinner: boolean;
}

const initialState: ChangePasswordState = {
  error: false,
  showSpinner: false
};

export function reducer(state = initialState, action: ChangePasswordActions): ChangePasswordState {
  switch (action.type) {
    case (ChangePasswordActionTypes.RequestChangePassword):
      return {
        ...state,
        showSpinner: true
      };
    case (ChangePasswordActionTypes.RequestChangeSuccessful):
      return {
        ...state,
        showSpinner: false
      };
    case (ChangePasswordActionTypes.RequestChangeFailed):
      return {
        ...state,
        error: true,
        showSpinner: true
      };
    default:
      return state;
  }
}

