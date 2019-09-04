import {ForgotPasswordActions, ForgotPasswordActionTypes} from './forgot-password.actions';

export interface ForgotPasswordState {
  email: string;
  tokenError: boolean;
  newPasswordError: boolean;
  showSpinner: boolean;
}

const initialState: ForgotPasswordState = {
  email: '',
  tokenError: false,
  newPasswordError: false,
  showSpinner: false
};

export function reducer(state = initialState, action: ForgotPasswordActions): ForgotPasswordState {
  switch (action.type) {
    case (ForgotPasswordActionTypes.RequestToken):
      return {
        ...state,
        email: action.payload,
        showSpinner: true
      };
    case (ForgotPasswordActionTypes.RequestTokenSuccessful):
      return {
        ...state,
        tokenError: false,
        showSpinner: false
      };
    case (ForgotPasswordActionTypes.RequestTokenFailed):
      return {
        ...state,
        tokenError: true,
        showSpinner: false
      };
    case (ForgotPasswordActionTypes.ChangePassword):
      return {
        ...state,
        showSpinner: true
      };
    case (ForgotPasswordActionTypes.ChangePasswordSuccessful):
      return {
        ...state,
        newPasswordError: false,
        showSpinner: false
      };
    case (ForgotPasswordActionTypes.ChangePasswordFailed):
      return {
        ...state,
        newPasswordError: true,
        showSpinner: false
      };
    default:
      return state;
  }
}

