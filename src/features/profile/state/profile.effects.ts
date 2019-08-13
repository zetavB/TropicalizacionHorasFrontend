import {Injectable} from '@angular/core';
import {UserService} from '../../../core/user.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {LoadFailed, LoadProfile, LoadSuccessful, ProfileActionTypes} from './profile.actions';
import {catchError , map, mergeMap} from 'rxjs/operators';
import {Estudiante} from '../../../models/estudiante.model';
import {CustomResponse} from '../../../models/custom-response.model';

@Injectable()
export class ProfileEffects {
  constructor(private userService: UserService, private actions$: Actions) {}

  @Effect()
  loadProfile$: Observable<Action> = this.actions$.pipe(
    ofType(ProfileActionTypes.LoadProfile),
    map((action: LoadProfile) => action.payload),
    mergeMap((email: string) =>
      this.userService.getStudent(email).pipe(
        map( (est: Estudiante) => {
          est.diasRestantes = this.userService.getDateDifference(est.fechaFinal);
          return new LoadSuccessful(est);
        }),
        catchError((err: CustomResponse) => of(new LoadFailed(err.errorMessages)))
      )
    )
  ); 
}
