import {Injectable} from '@angular/core';
import {LoginService} from '../login.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {Login, LoginActionTypes, LoginFailed, LoginSuccesfull} from './login.actions';
import {catchError, exhaustMap, map, mergeMap, tap} from 'rxjs/operators';
import {TokenService} from '../../../core/token.service';
import {CustomResponse} from '../../../models/custom-response.model';
import {Router} from '@angular/router';

@Injectable()
export class LoginEffects {
  constructor(private loginService: LoginService, private tokenService: TokenService, private router: Router, private actions$: Actions) {}

  @Effect({dispatch: false})
  tokenPresent$: Observable<boolean> = this.actions$.pipe(
    ofType(LoginActionTypes.TokenPresent),
    mergeMap(() => this.router.navigate(['/perfil']))
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

  @Effect()
  succesfullLogin$: Observable<CustomResponse> = this.actions$.pipe(
    ofType(LoginActionTypes.LoginSuccesfull),
    map((action: LoginSuccesfull) => action.payload),
    tap((resp: CustomResponse) => {
        this.tokenService.saveJwtToken(resp.response.toString());
        this.router.navigate(['/perfil']);
      }
    )
  );
}
