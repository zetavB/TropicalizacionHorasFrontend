import {Injectable} from '@angular/core';
import {LoginService} from '../login.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {Login, LoginActionTypes, LoginFailed, LoginSuccesfull, TokenInvalid, TokenPresent, TokenValid} from './login.actions';
import {catchError, exhaustMap, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {TokenService} from '../../../core/token.service';
import {CustomResponse} from '../../../models/custom-response.model';
import {Router} from '@angular/router';
import {LoginState} from './login.reducer';

@Injectable()
export class LoginEffects {
  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private actions$: Actions,
    private store$: Store<LoginState>) {}

  @Effect()
  tokenPresent$: Observable<Action> = this.actions$.pipe(
    ofType(LoginActionTypes.TokenPresent),
    map((action: TokenPresent) => action.payload),
    withLatestFrom(this.store$),
    exhaustMap(([token, state]: [string, LoginState]) => {
        if (!state.isLoggedIn) {
          return this.loginService.validateToken(token).pipe(
            map((resp: CustomResponse) => new TokenValid(token)),
            catchError((err: CustomResponse) => of(new TokenInvalid(err.errorMessages)))
          );
        }
      }
    )
  );

  @Effect({dispatch: false})
  tokenValid$: Observable<boolean> = this.actions$.pipe(
    ofType(LoginActionTypes.TokenValid),
    tap( () => {
        if (this.router.url === '/login') {
          this.router.navigate(['/perfil']);
        }
      }
    )
  );

  @Effect({dispatch: false})
  tokenInvalid$: Observable<boolean> = this.actions$.pipe(
    ofType(LoginActionTypes.TokenInvalid),
    tap( () => {
        this.tokenService.eraseToken();
        this.router.navigate(['/login']);
      }
    )
  );

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(LoginActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((info: string[]) =>
      this.loginService.login(info[0], info[1]).pipe(
        map((resp: CustomResponse) => new LoginSuccesfull(resp)),
        catchError((err: CustomResponse) => of(new LoginFailed(err)))
      )
    )
  );

  @Effect({dispatch: false})
  succesfullLogin$: Observable<CustomResponse> = this.actions$.pipe(
    ofType(LoginActionTypes.LoginSuccesfull),
    map((action: LoginSuccesfull) => action.payload),
    tap((resp: CustomResponse) => {
        this.tokenService.saveJwtToken(resp.response.toString());
        this.router.navigate(['/perfil']);
      }
    )
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType(LoginActionTypes.Logout),
    tap( () => {
        this.tokenService.eraseToken();
        this.router.navigate(['login']);
      }
    )
  );
}
