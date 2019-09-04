import {LoginActions, LoginActionTypes} from './login.actions';
import {JwtInfoModel} from '../../../models/jwt-info.model';
import {TokenService} from '../../../core/token.service';

export interface LoginState {
  isLoggedIn: boolean;
  userToken: string;
  tokenInfo: JwtInfoModel;
  error: boolean;
  showSpinner: boolean;
}

const initialState: LoginState = {
  isLoggedIn: false,
  userToken: '',
  tokenInfo: null,
  error: false,
  showSpinner: false
};

export function reducer(state = initialState, action: LoginActions): LoginState {
  switch (action.type) {
    case LoginActionTypes.TokenValid:
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload,
        tokenInfo: TokenService.decodeToken(action.payload)
      };

    case LoginActionTypes.TokenInvalid:
      return {
        ...state,
        isLoggedIn: false,
        userToken: '',
        tokenInfo: null,
        error: true
      };

    case LoginActionTypes.Login:
      return {
        ...state,
        showSpinner: true
      };

    case LoginActionTypes.LoginSuccesfull:
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload.response.toString(),
        tokenInfo: TokenService.decodeToken(action.payload.response.toString()),
        error: false,
        showSpinner: false
      };

    case LoginActionTypes.LoginFailed:
      return {
        ...state,
        error: true,
        showSpinner: false
      };

    case LoginActionTypes.Logout:
      return {
        ...state,
        isLoggedIn: false,
        userToken: '',
        tokenInfo: null
      };

    default: return state;
  }
}
