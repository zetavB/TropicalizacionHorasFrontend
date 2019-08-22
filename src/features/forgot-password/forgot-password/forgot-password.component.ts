import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getForgotPasswordTokenError, State} from '../state';
import {RequestToken} from '../state/forgot-password.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  requestError$: Observable<boolean>;

  constructor(private store$: Store<State>) { }

  ngOnInit() {
    this.requestError$ = this.store$.pipe(
      select(getForgotPasswordTokenError)
    );
  }

  sendRetrievalCode() {
    this.store$.dispatch(new RequestToken(this.email));
  }
}
