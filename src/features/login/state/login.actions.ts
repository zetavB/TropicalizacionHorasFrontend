import {Action} from '@ngrx/store';
import {CustomResponse} from '../../../models/custom-response.model';

export enum LoginActionTypes {
  TokenPresent = '[Login] Token Present',
  Login = '[Login] Login',
  LoginSuccesfull = '[Login] Login Succesfull',
  LoginFailed = '[Login] Login Failed'
}

export class TokenPresent implements  Action {
  readonly type = LoginActionTypes.TokenPresent;

  constructor(public payload: string) { }
}

export class Login implements  Action {
  readonly type = LoginActionTypes.Login;

  constructor(public payload: string[]) { }
}

export class LoginSuccesfull implements  Action {
  readonly type = LoginActionTypes.LoginSuccesfull;

  constructor(public payload: CustomResponse) { }
}

export class LoginFailed implements  Action {
  readonly type = LoginActionTypes.LoginFailed;

  constructor(public payload: CustomResponse) { }
}

export type LoginActions = TokenPresent
  | Login
  | LoginSuccesfull
  | LoginFailed;
