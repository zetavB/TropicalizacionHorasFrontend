import {Injectable} from '@angular/core';
import {ForgotPasswordService} from '../forgot-password.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  ChangePassword, ChangePasswordFailed, ChangePasswordSuccessful,
  ForgotPasswordActionTypes,
  RequestToken,
  RequestTokenFailed,
  RequestTokenSuccessful
} from './forgot-password.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {RetrievePasswordModel} from '../../../models/retrieve-password.model';
import {Router} from '@angular/router';

@Injectable()
export class ForgotPasswordEffects {
  constructor(private actions$: Actions, private router: Router, private forgotPasswordService: ForgotPasswordService) {}

  @Effect()
  requestToken$: Observable<Action> = this.actions$.pipe(
    ofType(ForgotPasswordActionTypes.RequestToken),
    map((action: RequestToken) => action.payload),
    exhaustMap((email: string) =>
      this.forgotPasswordService.requestToken(email).pipe(
        map(() => new RequestTokenSuccessful()),
        catchError(() => of(new RequestTokenFailed()))
      )
    )
  );

  @Effect({dispatch: false})
  requestTokenSuccessful$ = this.actions$.pipe(
    ofType(ForgotPasswordActionTypes.RequestTokenSuccessful),
    tap(() => this.router.navigate(['olvido-contrasenna/cambiar-contrasenna']))
  );

  @Effect()
  changePassword$: Observable<Action> = this.actions$.pipe(
    ofType(ForgotPasswordActionTypes.ChangePassword),
    map((action: ChangePassword) => action.payload),
    exhaustMap((model: RetrievePasswordModel) =>
      this.forgotPasswordService.changePassword(model).pipe(
        map(() => new ChangePasswordSuccessful()),
        catchError(() => of(new ChangePasswordFailed()))
      )
    )
  );

  @Effect({dispatch: false})
  changePasswordSuccessful$ = this.actions$.pipe(
    ofType(ForgotPasswordActionTypes.ChangePasswordSuccessful),
    tap(() => this.router.navigate(['login']))
  );
}
