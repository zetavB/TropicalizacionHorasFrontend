import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getForgotPasswordTokenError, State} from '../state';
import {RequestToken} from '../state/forgot-password.actions';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPassForm = this.fb.group({
    email: ['', Validators.required, Validators.email]
  });
  requestError$: Observable<boolean>;
  alive = true;

  constructor(private store$: Store<State>, private fb: FormBuilder) { }

  ngOnInit() {
    this.requestError$ = this.store$.pipe(select(getForgotPasswordTokenError));
    this.requestError$
      .pipe(takeWhile(() => this.alive))
      .subscribe((err: boolean) => {
        this.forgotPassForm.get('email').setErrors({requestError: true});
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  sendRetrievalCode() {
    const email: string = this.forgotPassForm.get('email').value;
    this.store$.dispatch(new RequestToken(email));
  }

}
