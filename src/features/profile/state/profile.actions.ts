import {Action} from '@ngrx/store';
import {Estudiante} from '../../../models/estudiante.model';

export enum ProfileActionTypes {
  LoadProfile = '[Profile] Load Profile',
  LoadSuccessful = '[Profile] Load Successful',
  LoadFailed = '[Profile] Load Failed'
}

export class LoadProfile implements  Action {
  readonly type = ProfileActionTypes.LoadProfile;

  // Payload is the user email
  constructor(public payload: string) {}
}

export class LoadSuccessful implements Action {
  readonly type = ProfileActionTypes.LoadSuccessful;

  // Payload is the student profile
  constructor(public payload: Estudiante) {}
}

export class LoadFailed implements Action {
  readonly type = ProfileActionTypes.LoadFailed;

  // Payload is the error message
  constructor(public payload: string) {}
}

export type ProfileActions = LoadProfile
  | LoadSuccessful
  | LoadFailed;
