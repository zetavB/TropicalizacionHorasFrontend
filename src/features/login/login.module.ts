import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';

import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducer} from './state/login.reducer';
import {CustomMaterialModule} from '../../app/material.module';
import {EffectsModule} from '@ngrx/effects';
import {LoginEffects} from './state/login.effects';
import {LoginService} from './login.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    StoreModule.forFeature('login', reducer),
    EffectsModule.forFeature([LoginEffects])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [ LoginService ]
})
export class LoginModule {}
