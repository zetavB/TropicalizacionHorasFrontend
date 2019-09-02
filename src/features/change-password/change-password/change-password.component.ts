import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getChangePasswordError, getChangePasswordSpinner, State} from '../state';
import {RequestChangePassword} from '../state/change-password.actions';
import {FormBuilder, Validators} from '@angular/forms';
import {MustMatch} from '../../../shared/validators/must-match.validator';
import {takeWhile} from 'rxjs/operators';
import {SpinnerOverlayService} from '../../../shared/components/spinner-overlay/spinner-overlay.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm = this.fb.group({
    currentPass: ['', [Validators.required]],
    newPass: ['', [Validators.required]],
    confirmNewPass: ['', [Validators.required]]
  }, {validators: MustMatch('newPass', 'confirmNewPass')});

  @ViewChild('card', {static: false, read: ElementRef}) formCard: ElementRef;
  alive = true;

  get currentPass() {return this.changePasswordForm.get('currentPass'); }
  get newPass() {return this.changePasswordForm.get('newPass'); }
  get confirmNewPass() {return this.changePasswordForm.get('confirmNewPass'); }

  constructor(private store$: Store<State>, private fb: FormBuilder, private spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.store$.pipe(
      select(getChangePasswordError),
      takeWhile(() => this.alive)
    ).subscribe((err: boolean) =>
      this.confirmNewPass.setErrors({requestError: err})
    );

    this.store$.pipe(
      select(getChangePasswordSpinner),
      takeWhile(() => this.alive)
    ).subscribe((show: boolean) => {
      if (show) {
        this.spinnerService.open(this.formCard);
      } else {
        this.spinnerService.close();
      }
    });
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.store$.dispatch(new RequestChangePassword([this.currentPass.value, this.newPass.value]));
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
