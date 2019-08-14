import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import {CustomMaterialModule} from '../../app/material.module';
import { ActivitiesService } from './activities.service';
import { ActivityRegisterComponent } from './activity-register/activity-register.component';
import { reducer } from './state/activities.reducer';
import { StoreModule } from '@ngrx/store';
import { ActivityEffects } from './state/activities.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    StoreModule.forFeature('activity', reducer),
    EffectsModule.forFeature([ActivityEffects])
  ],
  declarations: [
    ActivitiesComponent,
    ActivityRegisterComponent
  ],
  providers: [ ActivitiesService ]
})
export class ActivitiesModule {}
