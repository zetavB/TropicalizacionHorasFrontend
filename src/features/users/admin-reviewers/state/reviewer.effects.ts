import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {catchError, concatMap, exhaustMap, map, tap, withLatestFrom} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { ReviewerActionTypes, ReviewerActions } from './reviewer.actions';
import {Action, Store} from '@ngrx/store';
import {
  AddReviewer,
  AddReviewerF,
  AddReviewerS,
  DeleteReviewer, DeleteReviewerF, DeleteReviewerS,
  EditReviewer,
  EditReviewerF,
  EditReviewerS,
  LoadReviewers,
  LoadReviewersF,
  LoadReviewersS,
  SelectReviewer
} from './reviewer.actions';
import {State} from './index';
import {Page} from '../../../../models/Page';
import {AdminReviewersService} from '../admin-reviewers.service';
import {Router} from '@angular/router';
import {ReviewerModel} from '../../../../models/entities/reviewer.model';



@Injectable()
export class ReviewerEffects {


  @Effect()
  loadReviewers$: Observable<Action> = this.actions$.pipe(
    ofType(ReviewerActionTypes.LoadReviewers),
    withLatestFrom(this.store$),
    map(([, state]: [LoadReviewers, State]) => [state.reviewers.reviewersList.reviewersPage]),
    concatMap(([reviewersPage]: [Page<ReviewerModel>]) =>
      this.reviewersService.getReviewers(reviewersPage.size, reviewersPage.number).pipe(
        map((reviewers: Page<ReviewerModel>) => new LoadReviewersS(reviewers)),
        catchError(() => of(new LoadReviewersF()))
      )
    )
  );

  @Effect()
  changeReviewersPage$: Observable<Action> = this.actions$.pipe(
    ofType(ReviewerActionTypes.ChangeReviewersPage),
    map(() => new LoadReviewers())
  );

  @Effect()
  addReviewer$: Observable<Action> = this.actions$.pipe(
    ofType(ReviewerActionTypes.AddReviewer),
    map((action: AddReviewer) => action.reviewer),
    exhaustMap((reviewer: ReviewerModel) =>
      this.reviewersService.addReviewer(reviewer).pipe(
        map(() => new AddReviewerS(reviewer)),
        catchError(() => of(new AddReviewerF()))
      )
    )
  );

  @Effect({dispatch: false})
  addReviewerS$ = this.actions$.pipe(
    ofType(ReviewerActionTypes.AddReviewerS),
    map((action: AddReviewerS) => action.reviewer),
    map((reviewer) => {
      this.router.navigate(['/usuarios']);
      return new SelectReviewer(reviewer.usuario.correo);
    })
  );

  @Effect()
  editReviewer$: Observable<Action> = this.actions$.pipe(
    ofType(ReviewerActionTypes.EditReviewer),
    map((action: EditReviewer) => action.newReviewer),
    exhaustMap((reviewer: ReviewerModel) =>
      this.reviewersService.editReviewer(reviewer).pipe(
        map(() => new EditReviewerS(reviewer)),
        catchError(() => of(new EditReviewerF()))
      )
    )
  );

  @Effect()
  deleteReviewer$: Observable<Action> = this.actions$.pipe(
    ofType(ReviewerActionTypes.DeleteReviewer),
    map((action: DeleteReviewer) => action.email),
    exhaustMap((reviewer: string) =>
      this.reviewersService.deleteReviewer(reviewer).pipe(
        map(() => new DeleteReviewerS(reviewer)),
        catchError(() => of(new DeleteReviewerF()))
      )
    )
  );

  @Effect({dispatch: false})
  deleteReviewerS$ = this.actions$.pipe(
    ofType(ReviewerActionTypes.DeleteReviewerS),
    tap(email => this.router.navigate(['/usuarios']))
  );

  constructor(private actions$: Actions<ReviewerActions>,
              private store$: Store<State>,
              private reviewersService: AdminReviewersService,
              private router: Router) {}

}
