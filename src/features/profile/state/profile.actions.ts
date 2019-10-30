import {Action} from '@ngrx/store';
import {Estudiante} from '../../../models/entities/estudiante.model';

export enum ProfileActionTypes {
  LoadProfile = '[Profile] Load Profile',
  LoadSuccessful = '[Profile] Load Successful',
  LoadFailed = '[Profile] Load Failed',
  LoadPendingHours = '[Profile] Load Pending hours',
  LoadPendingHoursS = '[Profile] Load Pending hours successful',
  LoadPendingHoursF = '[Profile] Load Pending hours failed'
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

export class LoadPendingHours implements Action {
  readonly type = ProfileActionTypes.LoadPendingHours;
  constructor(public studentEmail: string) {}
}
export class LoadPendingHoursS implements Action {
  readonly type = ProfileActionTypes.LoadPendingHoursS;
  constructor(public hours: number) {}
}
export class LoadPendingHoursF implements Action {
  readonly type = ProfileActionTypes.LoadPendingHoursF;
}

export type ProfileActions = LoadProfile
  | LoadSuccessful
  | LoadFailed
  | LoadPendingHours
  | LoadPendingHoursS
  | LoadPendingHoursF;
