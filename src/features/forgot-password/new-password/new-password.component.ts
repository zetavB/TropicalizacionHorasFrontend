import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getForgotPasswordEmail, getForgotPasswordNewPasswordError, State} from '../state';
import {Observable} from 'rxjs';
import {RetrievePasswordModel} from '../../../models/retrieve-password.model';
import {take, tap} from 'rxjs/operators';
import {ChangePassword} from '../state/forgot-password.actions';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  requestError$: Observable<boolean>;
  code: string;
  password: string;
  confirmPass: string;
  private email: string;

  constructor(private store$: Store<State>) { }

  ngOnInit() {
    this.requestError$ = this.store$.pipe(
      select(getForgotPasswordNewPasswordError)
    );

    this.store$.select(getForgotPasswordEmail).pipe(
      take(1),
      tap((email: string) => this.email = email)
    ).subscribe();
  }

  newPassword() {
    this.store$.dispatch(new ChangePassword({
      correo: this.email,
      tokenRecuperacion: this.code,
      contrasennaNueva: this.password
    } as RetrievePasswordModel));
  }
}
