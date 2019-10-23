import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {CustomMaterialModule} from '../../app/material.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {reducer} from './state/change-password.reducer';
import {ChangePasswordEffects} from './state/change-password.effects';
import {ChangePasswordService} from './change-password.service';
import {ChangePasswordRoutingModule} from './change-password-routing.module';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    ChangePasswordRoutingModule,
    StoreModule.forFeature('changePassword', reducer),
    EffectsModule.forFeature([ChangePasswordEffects])
  ],
  providers: [ChangePasswordService]
})
export class ChangePasswordModule { }
