import {Action} from '@ngrx/store';
import {RetrievePasswordModel} from '../../../models/retrieve-password.model';

export enum ChangePasswordActionTypes {
  RequestChangePassword = '[Change password] Request a password change',
  RequestChangeSuccessful = '[Change password] Password change successful',
  RequestChangeFailed = '[Change password] Password change failed',
}

export class RequestChangePassword implements Action {
  readonly type = ChangePasswordActionTypes.RequestChangePassword;

  constructor(public payload: string[]) {}
}

export class RequestChangeSuccessful implements  Action {
  readonly  type = ChangePasswordActionTypes.RequestChangeSuccessful;
}

export class RequestChangeFailed implements  Action {
  readonly  type = ChangePasswordActionTypes.RequestChangeFailed;
}

export type ChangePasswordActions = RequestChangePassword
  | RequestChangeSuccessful
  | RequestChangeFailed;
