import {ForgotPasswordActions, ForgotPasswordActionTypes} from './forgot-password.actions';

export interface ForgotPasswordState {
  email: string;
  tokenError: boolean;
  newPasswordError: boolean;
}

const initialState: ForgotPasswordState = {
  email: '',
  tokenError: false,
  newPasswordError: false
};

export function reducer(state = initialState, action: ForgotPasswordActions): ForgotPasswordState {
  switch (action.type) {
    case (ForgotPasswordActionTypes.RequestToken):
      return {
        ...state,
        email: action.payload
      };
    case (ForgotPasswordActionTypes.RequestTokenSuccessful):
      return {
        ...state,
        tokenError: false
      };
    case (ForgotPasswordActionTypes.RequestTokenFailed):
      return {
        ...state,
        tokenError: true
      };
    case (ForgotPasswordActionTypes.ChangePasswordSuccessful):
      return {
        ...state,
        newPasswordError: false,
      };
    case (ForgotPasswordActionTypes.ChangePasswordFailed):
      return {
        ...state,
        newPasswordError: true
      };
    default:
      return state;
  }
}

