import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getForgotPasswordShowSpinner, getForgotPasswordTokenError, State} from '../state';
import {RequestToken} from '../state/forgot-password.actions';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {SpinnerOverlayService} from '../../../shared/components/spinner-overlay/spinner-overlay.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPassForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  @ViewChild('card', {static: false, read: ElementRef}) formCard: ElementRef;

  get email() { return this.forgotPassForm.get('email'); }

  alive = true;

  constructor(private store$: Store<State>, private fb: FormBuilder, private spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.store$.pipe(
        select(getForgotPasswordTokenError),
        takeWhile(() => this.alive)
      )
      .subscribe((err: boolean) => {
        this.forgotPassForm.get('email').setErrors({requestError: err});
      });

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

  sendRetrievalCode() {
    const email: string = this.forgotPassForm.get('email').value;
    this.store$.dispatch(new RequestToken(email));
  }

}
