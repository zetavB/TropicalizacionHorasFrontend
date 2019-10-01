import { Action } from '@ngrx/store';

export enum StudentActionTypes {
  LoadStudents = '[Student] Load Students',
  
  
}

export class LoadStudents implements Action {
  readonly type = StudentActionTypes.LoadStudents;
}


export type StudentActions = LoadStudents;
