import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {ChangePasswordActionTypes, RequestChangeFailed, RequestChangePassword, RequestChangeSuccessful} from './change-password.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {ChangePasswordService} from '../change-password.service';
import {CustomResponse} from '../../../models/custom-response.model';

@Injectable()
export class ChangePasswordEffects {
  constructor(private actions$: Actions, private router: Router, private changePasswordService: ChangePasswordService) {}

  @Effect()
  requestChangePassword$: Observable<Action> = this.actions$.pipe(
    ofType(ChangePasswordActionTypes.RequestChangePassword),
    map((action: RequestChangePassword) => action.payload),
    exhaustMap((passwords: string[]) =>
      this.changePasswordService.changePassword(passwords[0], passwords[1]).pipe(
        map((resp: CustomResponse) => new RequestChangeSuccessful()),
        catchError((err: CustomResponse) => of(new RequestChangeFailed()))
      )
    )
  );

  @Effect({dispatch: false})
  ChangePasswordSuccessful: Observable<Action> = this.actions$.pipe(
    ofType(ChangePasswordActionTypes.RequestChangeSuccessful),
    tap(() =>
      this.router.navigate(['/perfil'])
    )
  );
}
