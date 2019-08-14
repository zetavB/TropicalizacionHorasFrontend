import {Action} from '@ngrx/store';
import { Activity } from 'src/models/activity.model';


export enum ActivityActionTypes {
  LoadActivity = '[Activity] Load Activity',
  LoadSuccessful = '[Activity] Load Successful',
  LoadFailed = '[Activity] Load Failed'
}

export class LoadActivity implements  Action {
  readonly type = ActivityActionTypes.LoadActivity;

  // Payload is the user email
  constructor(public payload: string) {}
}

export class LoadSuccessful implements Action {
  readonly type = ActivityActionTypes.LoadSuccessful;

  // Payload is the array of activities
  constructor(public payload: Activity[]) {}
}

export class LoadFailed implements Action {
  readonly type = ActivityActionTypes.LoadFailed;

  // Payload is the error message
  constructor(public payload: string) {}
}

export type ActivityActions = LoadActivity
  | LoadSuccessful
  | LoadFailed;
