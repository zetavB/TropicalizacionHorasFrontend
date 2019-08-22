import {Action} from '@ngrx/store';
import {RetrievePasswordModel} from '../../../models/retrieve-password.model';

export enum ForgotPasswordActionTypes {
  RequestToken = '[Forgot password] Request password change token',
  RequestTokenSuccessful = '[Forgot password] Token requested successfully',
  RequestTokenFailed = '[Forgot password] Token request failed',
  ChangePassword = '[Forgot password] Password change requested',
  ChangePasswordSuccessful = '[Forgot password] Password changed sucessfully',
  ChangePasswordFailed = '[Forgot password] Password change failed'
}

export class RequestToken implements Action {
  readonly type = ForgotPasswordActionTypes.RequestToken;

  constructor(public payload: string) {}
}

export class RequestTokenSuccessful implements  Action {
  readonly  type = ForgotPasswordActionTypes.RequestTokenSuccessful;
}

export class RequestTokenFailed implements  Action {
  readonly  type = ForgotPasswordActionTypes.RequestTokenFailed;
}

export class ChangePassword implements Action {
  readonly type = ForgotPasswordActionTypes.ChangePassword;

  constructor(public payload: RetrievePasswordModel) {}
}

export class ChangePasswordSuccessful implements  Action {
  readonly  type = ForgotPasswordActionTypes.ChangePasswordSuccessful;
}

export class ChangePasswordFailed implements  Action {
  readonly  type = ForgotPasswordActionTypes.ChangePasswordFailed;
}

export type ForgotPasswordActions = RequestToken
  | RequestTokenSuccessful
  | RequestTokenFailed
  | ChangePassword
  | ChangePasswordSuccessful
  | ChangePasswordFailed;

