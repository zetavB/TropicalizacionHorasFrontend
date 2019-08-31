import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getChangePasswordError, State} from '../state';
import {RequestChangePassword} from '../state/change-password.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  currentPass: string;
  newPass: string;
  confirmNewPass: string;
  changeError$: Observable<boolean>;
  confirmPassError: boolean;

  constructor(private store$: Store<State>) { }

  ngOnInit() {
    this.changeError$ = this.store$.pipe(select(getChangePasswordError));
  }

  changePassword() {
    this.confirmPassError = !(this.newPass === this.confirmNewPass);
    if (!this.confirmPassError) {
      this.store$.dispatch(new RequestChangePassword([this.currentPass, this.newPass]));
    }
  }
}
