import { Action } from '@ngrx/store';

export enum ReviewerActionTypes {
  LoadReviewers = '[Reviewer] Load Reviewers',
  
  
}

export class LoadReviewers implements Action {
  readonly type = ReviewerActionTypes.LoadReviewers;
}


export type ReviewerActions = LoadReviewers;
