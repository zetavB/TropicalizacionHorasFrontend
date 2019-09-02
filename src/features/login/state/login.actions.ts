import {Action} from '@ngrx/store';
import {CustomResponse} from '../../../models/custom-response.model';

export enum LoginActionTypes {
  TokenPresent = '[Login] Token Present',
  TokenValid = '[Login] Token Valid',
  TokenInvalid = '[Login] Token Invalid',
  Login = '[Login] Login',
  LoginSuccesfull = '[Login] Login Succesfull',
  LoginFailed = '[Login] Login Failed',
  Logout = '[Login] Logout'
}

export class TokenPresent implements  Action {
  readonly type = LoginActionTypes.TokenPresent;

  constructor(public payload: string) { }
}

export class TokenValid implements  Action {
  readonly  type = LoginActionTypes.TokenValid;

  constructor(public payload: string) { }
}

export class TokenInvalid implements  Action {
  readonly  type = LoginActionTypes.TokenInvalid;
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
}

export class Logout implements  Action {
  readonly  type = LoginActionTypes.Logout;
}

export type LoginActions = TokenPresent
  | TokenValid
  | TokenInvalid
  | Login
  | LoginSuccesfull
  | LoginFailed
  | Logout;
