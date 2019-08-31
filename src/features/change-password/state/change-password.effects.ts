import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';

@Injectable()
export class ChangePasswordEffects {
  constructor(private actions$: Actions, private router: Router) {}
}
