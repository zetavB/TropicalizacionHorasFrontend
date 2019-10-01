import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ReviewerActionTypes, ReviewerActions } from './reviewer.actions';



@Injectable()
export class ReviewerEffects {


  @Effect()
  loadReviewers$ = this.actions$.pipe(
    ofType(ReviewerActionTypes.LoadReviewers),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<ReviewerActions>) {}

}
