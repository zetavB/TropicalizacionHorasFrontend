import { ActivitiesService } from '../activities.service';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import { ActivityActionTypes,
  LoadActivity,
  LoadSuccessful,
  LoadFailed,
  DeleteActivity,
  DeleteSuccessful,
  AddActivity,
  AddSuccessful,
  AddFailed,
  AddActivityFiles,
  UpdateFilesProgress,
  LoadActivityDetails,
  LoadActivityDetailsSuccessful,
  LoadActivityDetailsFail,
  UpdateActivity,
  UpdateFailed,
  UpdateSuccessful} from './activities.actions';
import {map, mergeMap, catchError, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CustomResponse } from 'src/models/custom-response.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {Activity} from '../../../models/entities/activity.model';
import {State} from './index';
import {UserRoles} from '../../../models/user-roles.model';

@Injectable()
export class ActivityEffects {
  constructor(
    private activitiesService: ActivitiesService,
    private actions$: Actions,
    private router: Router,
    private spinner: NgxSpinnerService,
    private store$: Store<State>) {}

  @Effect()
  loadActivityDetails$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.LoadActivityDetails),
    map((action: LoadActivityDetails) => action.payload),
    mergeMap((id: number) =>
      this.activitiesService.getActivityDetails(id).pipe(
        map((content: {activity: Activity, files: []}) => {
          this.spinner.hide();
          return new LoadActivityDetailsSuccessful(content);
        }),
        catchError((err: CustomResponse) => {
          this.spinner.hide();
          return of(new LoadActivityDetailsFail(err.errorMessages));
        })
      )
    )
  );

  @Effect()
  loadActivities$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.LoadActivity),
    map((action: LoadActivity) => action.payload),
    withLatestFrom(this.store$),
    mergeMap(([email, state]: [string, State]) => {
      if (state.login.tokenInfo.rol === UserRoles.Student) {
        return this.activitiesService.getActivities(email).pipe(
          map((activities: Activity[]) => {
            this.spinner.hide();
            return new LoadSuccessful(activities);
          }),
          catchError((err: CustomResponse) => {
            this.spinner.hide();
            return of(new LoadFailed(err.errorMessages));
          })
        );
      } else {
        // tslint:disable-next-line:max-line-length
        return this.activitiesService.getAllActivities(state.activity.showAccepted, state.activity.showPending, state.activity.showDeclined).pipe(
          map((activities: Activity[]) => {
            this.spinner.hide();
            return new LoadSuccessful(activities);
          }),
          catchError( (err: CustomResponse) => {
            this.spinner.hide();
            return of(new LoadFailed(err.errorMessages));
          })
        );
      }
    })
  );

  @Effect()
  changeShowAccepted$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.ChangeShowAccepted),
    map(() => new LoadActivity(''))
  );

  @Effect()
  changeShowPending$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.ChangeShowPending),
    map(() => new LoadActivity(''))
  );

  @Effect()
  changeShowDeclined$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.ChangeShowDeclined),
    map(() => new LoadActivity(''))
  );

  @Effect()
  addActivity$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.AddActivity),
    map((action: AddActivity) => action.payload),
    mergeMap((content: {activity: Activity, files: Set<File>}) =>
      this.activitiesService.postActivity(content.activity).pipe(
        map(res => {
          if (content.files.size !== 0) {
            const filePackage = {id: res, files: content.files};
            return new AddActivityFiles(filePackage);
          } else {
            this.router.navigate(['/actividades']);
            this.spinner.hide();
            return new AddSuccessful(content.activity);
          }
        }),
        catchError((err: CustomResponse) => {
          this.spinner.hide();
          return of(new AddFailed(err.errorMessages));
        })
      )
    )
  );

  @Effect()
  uploadFiles$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.AddActivityFiles),
    map((action: AddActivityFiles) => action.payload),
    switchMap((content: {id: number, files: Set<File>}) =>
    this.activitiesService.uploadActivityFiles(content.id, content.files).pipe(
        map(res => {
          this.router.navigate(['/actividades']);
          this.spinner.hide();
          return new UpdateFilesProgress([]);
        }),
        catchError((err: CustomResponse) => {
          this.spinner.hide();
          return of(new AddFailed(err.errorMessages));
        })
      )
    )
  );

  @Effect()
  updateActivity$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.UpdateActivity),
    map((action: UpdateActivity) => action.payload),
    mergeMap((content: {activity: Activity, files: Set<File>, filesToRemove: string[]}) =>
      this.activitiesService.modifyActivity(content.activity.idGenerado, content.activity, content.files, content.filesToRemove).pipe(
        map(res => {
          this.router.navigate(['/actividades']);
          this.spinner.hide();
          return new UpdateSuccessful('Successful');
        }),
        catchError((err: CustomResponse) => {
          this.spinner.hide();
          return of(new UpdateFailed(err.errorMessages));
        })
      )
    )
  );

  @Effect()
  deleteActivity$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.DeleteActivity),
    map((action: DeleteActivity) => action.payload),
    mergeMap((id: number) =>
      this.activitiesService.deleteActivity(id).pipe(
        map(res => {
          this.spinner.hide();
          return new DeleteSuccessful(id);
        }),
        catchError((err: CustomResponse) => {
          this.spinner.hide();
          return of(new LoadFailed(err.errorMessages));
        })
      )
    )
  );
}
