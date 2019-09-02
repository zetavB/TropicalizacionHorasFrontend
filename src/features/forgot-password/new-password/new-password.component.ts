import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getForgotPasswordEmail, getForgotPasswordNewPasswordError, getForgotPasswordShowSpinner, State} from '../state';
import {Observable} from 'rxjs';
import {RetrievePasswordModel} from '../../../models/retrieve-password.model';
import {take, takeWhile, tap} from 'rxjs/operators';
import {ChangePassword} from '../state/forgot-password.actions';
import {FormBuilder, Validators} from '@angular/forms';
import {MustMatch} from '../../../shared/validators/must-match.validator';
import {SpinnerOverlayService} from '../../../shared/components/spinner-overlay/spinner-overlay.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit, OnDestroy {

  newPassForm = this.fb.group({
    code: ['', Validators.required],
    password: ['', Validators.required],
    confirmPass: ['', Validators.required]
  }, {validators: MustMatch('password', 'confirmPass')});
  @ViewChild('card', {static: false, read: ElementRef}) formCard: ElementRef;
  private email: string;
  private alive = true;

  get code() { return this.newPassForm.get('code'); }
  get password() { return this.newPassForm.get('password'); }
  get confirmPass() { return this.newPassForm.get('confirmPass'); }

  constructor(private store$: Store<State>, private fb: FormBuilder, private spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.store$.pipe(
      select(getForgotPasswordNewPasswordError),
      takeWhile(() => this.alive)
    ).subscribe((err: boolean) =>
      this.confirmPass.setErrors({requestError: err})
    );

    this.store$.select(getForgotPasswordEmail).pipe(
      take(1),
      tap((email: string) => this.email = email)
    ).subscribe();

    this.store$.pipe(
      select(getForgotPasswordShowSpinner),
      takeWhile(() => this.alive)
    ).subscribe((show: boolean) => {
      if (show) {
        this.spinnerService.open(this.formCard);
      } else {
        this.spinnerService.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  newPassword() {
    if (this.newPassForm.valid) {
      this.store$.dispatch(new ChangePassword({
        correo: this.email,
        tokenRecuperacion: this.code.value,
        contrasennaNueva: this.password.value
      } as RetrievePasswordModel));
    }
  }
}
