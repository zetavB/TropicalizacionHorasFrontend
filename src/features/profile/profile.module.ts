import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {StoreModule} from '@ngrx/store';
import {reducer} from './state/profile.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ProfileEffects} from './state/profile.effects';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    StoreModule.forFeature('profile', reducer),
    EffectsModule.forFeature([ProfileEffects])
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [ ]
})
export class ProfileModule {}
