import {ChangePasswordActions, ChangePasswordActionTypes} from './change-password.actions';

export interface ChangePasswordState {
  error: boolean;
}

const initialState: ChangePasswordState = {
  error: false
};

export function reducer(state = initialState, action: ChangePasswordActions): ChangePasswordState {
  switch (action.type) {
    case (ChangePasswordActionTypes.RequestChangePassword):
      return null;
    case (ChangePasswordActionTypes.RequestChangeSuccessful):
      return null;
    case (ChangePasswordActionTypes.RequestChangeFailed):
      return null;
    default:
      return state;
  }
}

