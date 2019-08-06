import {LoginActions, LoginActionTypes} from './login.actions';
import {JwtInfoModel} from '../../../models/jwt-info.model';
import {TokenService} from '../../../core/token.service';

export interface LoginState {
  isLoggedIn: boolean;
  userToken: string;
  tokenInfo: JwtInfoModel;
  error: string;
}

const initialState: LoginState = {
  isLoggedIn: false,
  userToken: '',
  tokenInfo: null,
  error: ''
};

export function reducer(state = initialState, action: LoginActions): LoginState {
  switch (action.type) {
    case LoginActionTypes.TokenPresent:
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload,
        tokenInfo: TokenService.decodeToken(action.payload)
      };

    case LoginActionTypes.LoginSuccesfull:
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload.response.toString(),
        tokenInfo: TokenService.decodeToken(action.payload.response.toString())
      };

    case LoginActionTypes.LoginFailed:
      return {
        ...state,
        error: action.payload.errorMessages
      };
    default: return state;
  }
}
