import { Action } from '@ngrx/store';
import {Page} from '../../../../models/Page';
import {ReviewerModel} from '../../../../models/entities/reviewer.model';

export enum ReviewerActionTypes {
  LoadReviewers = '[Reviewer] Load Reviewers',
  LoadReviewersS = '[Reviewer] Load Reviewers successful',
  LoadReviewersF = '[Reviewer] Load Reviewers failed',
  ChangeReviewersPage = '[Reviewers] Change reviewers page',

  SelectReviewer = '[Reviewers] Select reviewer',

  AddReviewer = '[Reviewers] Add reviewer',
  AddReviewerS = '[Reviewers] Add reviewer successful',
  AddReviewerF = '[Reviewers] Add reviewer failed',

  EditReviewer = '[Reviewers] Edit reviewer',
  EditReviewerS = '[Reviewers] Edit reviewer successful',
  EditReviewerF = '[Reviewers] Edit reviewer failed',

  DeleteReviewer = '[Reviewers] Delete reviewer',
  DeleteReviewerS = '[Reviewers] Delete reviewer successful',
  DeleteReviewerF = '[Reviewers] Delete reviewer failed',
}

export class LoadReviewers implements Action {
  readonly type = ReviewerActionTypes.LoadReviewers;
}
export class LoadReviewersS implements Action {
  readonly type = ReviewerActionTypes.LoadReviewersS;

  constructor(public reviewers: Page<ReviewerModel>) {}
}
export class LoadReviewersF implements Action {
  readonly type = ReviewerActionTypes.LoadReviewersF;
}
export class ChangeReviewersPage implements Action {
  readonly type = ReviewerActionTypes.ChangeReviewersPage;

  constructor(public newSize: number, public newNumber: number) {}
}

export class SelectReviewer implements Action {
  readonly type = ReviewerActionTypes.SelectReviewer;

  constructor(public email: string) {}
}

export class AddReviewer implements Action {
  readonly type = ReviewerActionTypes.AddReviewer;

  constructor(public reviewer: ReviewerModel) {}
}
export class AddReviewerS implements Action {
  readonly type = ReviewerActionTypes.AddReviewerS;

  constructor(public reviewer: ReviewerModel) {}
}
export class AddReviewerF implements Action {
  readonly type = ReviewerActionTypes.AddReviewerF;
}

export class EditReviewer implements Action {
  readonly type = ReviewerActionTypes.EditReviewer;

  constructor(public newReviewer: ReviewerModel) {}
}
export class EditReviewerS implements Action {
  readonly type = ReviewerActionTypes.EditReviewerS;

  constructor(public newReviewer: ReviewerModel) {}
}
export class EditReviewerF implements Action {
  readonly type = ReviewerActionTypes.EditReviewerF;
}

export class DeleteReviewer implements Action {
  readonly type = ReviewerActionTypes.DeleteReviewer;

  constructor(public email: string) {}
}
export class DeleteReviewerS implements Action {
  readonly type = ReviewerActionTypes.DeleteReviewerS;

  constructor(public email: string) {}
}
export class DeleteReviewerF implements Action {
  readonly type = ReviewerActionTypes.DeleteReviewerF;
}

export type ReviewerActions = LoadReviewers
  | LoadReviewersS
  | LoadReviewersF
  | ChangeReviewersPage
  | SelectReviewer
  | AddReviewer
  | AddReviewerS
  | AddReviewerF
  | EditReviewer
  | EditReviewerS
  | EditReviewerF
  | DeleteReviewer
  | DeleteReviewerS
  | DeleteReviewerF;

