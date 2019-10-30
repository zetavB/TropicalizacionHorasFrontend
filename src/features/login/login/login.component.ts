import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TokenService} from '../../../core/token.service';
import {select, Store} from '@ngrx/store';
import {LoginState} from '../state/login.reducer';
import {Login, TokenPresent} from '../state/login.actions';
import {FormBuilder, Validators} from '@angular/forms';
import {getIsLoggedIn, getLoginError, getLoginSpinner} from '../state';
import {takeWhile} from 'rxjs/operators';
import {SpinnerOverlayService} from '../../../shared/components/spinner-overlay/spinner-overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  alive = true;
  // The read property is used as a workaround to get the Material component as an ElementRef
  @ViewChild('loginCard', {static: false, read: ElementRef}) loginCard: ElementRef;

  constructor(
    private tokenService: TokenService,
    private store$: Store<LoginState>,
    private fb: FormBuilder,
    private spinnerService: SpinnerOverlayService) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    if (this.tokenService.isTokenPresent()) {
      this.store$.dispatch(new TokenPresent(this.tokenService.getToken()));
    }

    this.store$.pipe(
      select(getLoginSpinner),
      takeWhile(() => this.alive)
    )
      .subscribe((show: boolean) => {
        if (show) {
          this.spinnerService.open(this.loginCard);
        } else {
          this.spinnerService.close();
        }
      });

    this.store$.pipe(
      select(getLoginError),
      takeWhile(() => this.alive)
    ).subscribe((err: boolean) => {
        this.password.setErrors({loginFailed: err});
        this.loginForm.setErrors({loginFailed: err});
      }
    );
  }

  login(): void {
    this.store$.dispatch(new Login([this.email.value, this.password.value]));
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
