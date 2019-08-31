import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../../app/material.module';
import { NewPasswordComponent } from './new-password/new-password.component';
import {ForgotPasswordService} from './forgot-password.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './state/forgot-password.reducer';
import {ForgotPasswordEffects} from './state/forgot-password.effects';



@NgModule({
  declarations: [ForgotPasswordComponent, NewPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    ForgotPasswordRoutingModule,
    StoreModule.forFeature('forgotPassword', reducer),
    EffectsModule.forFeature([ForgotPasswordEffects])
  ],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordModule { }
