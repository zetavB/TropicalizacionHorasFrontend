import {Injectable} from '@angular/core';
import {UserService} from '../../../core/user.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  LoadFailed,
  LoadPendingHours,
  LoadPendingHoursF,
  LoadPendingHoursS,
  LoadProfile,
  LoadSuccessful,
  ProfileActionTypes
} from './profile.actions';
import {catchError , map, mergeMap} from 'rxjs/operators';
import {CustomResponse} from '../../../models/custom-response.model';
import { NgxSpinnerService } from 'ngx-spinner';
import {Estudiante} from '../../../models/entities/estudiante.model';

@Injectable()
export class ProfileEffects {
  constructor(
    private userService: UserService,
    private actions$: Actions,
    private spinner: NgxSpinnerService) {}

  @Effect()
  loadProfile$: Observable<Action> = this.actions$.pipe(
    ofType(ProfileActionTypes.LoadProfile),
    map((action: LoadProfile) => action.payload),
    mergeMap((email: string) =>
      this.userService.getStudent(email).pipe(
        map( (est: Estudiante) => {
          est.diasRestantes = this.userService.getDateDifference(est.fechaFinal);
          this.spinner.hide();
          return new LoadSuccessful(est);
        }),
        catchError((err: CustomResponse) => {
          this.spinner.hide();
          return of(new LoadFailed(err.errorMessages));
        })
      )
    )
  );

  @Effect()
  loadPendingHours$: Observable<Action> = this.actions$.pipe(
    ofType(ProfileActionTypes.LoadPendingHours),
    map((action: LoadPendingHours) => action.studentEmail),
    mergeMap((email: string) =>
      this.userService.getPendingHours(email).pipe(
        map(hours => new LoadPendingHoursS(hours)),
        catchError(() => of(new LoadPendingHoursF()))
      )
    )
  );
}
