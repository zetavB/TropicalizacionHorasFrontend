import { ActivitiesService } from '../activities.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ActivityActionTypes, LoadActivity, LoadSuccessful, LoadFailed } from './activities.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Activity } from 'src/models/activity.model';
import { Injectable } from '@angular/core';
import { CustomResponse } from 'src/models/custom-response.model';

@Injectable()
export class ActivityEffects {
  constructor(private activitiesService: ActivitiesService, private actions$: Actions) {}

  @Effect()
  loadActivities$: Observable<Action> = this.actions$.pipe(
    ofType(ActivityActionTypes.LoadActivity),
    map((action: LoadActivity) => action.payload),
    mergeMap((email: string) =>
      this.activitiesService.getActivities(email).pipe(
        map( (activities: Activity[]) => {
          return new LoadSuccessful(activities);
        }),
        catchError((err: CustomResponse) => of(new LoadFailed(err.errorMessages)))
      )
    )
  );
}