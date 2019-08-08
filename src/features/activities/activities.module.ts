import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import {CustomMaterialModule} from '../../app/material.module';
import { ActivitiesService } from './activities.service';
import { ActivityRegisterComponent } from './activity-register/activity-register.component';

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FormsModule,
    CustomMaterialModule
  ],
  declarations: [
    ActivitiesComponent,
    ActivityRegisterComponent
  ],
  providers: [ ActivitiesService ]
})
export class ActivitiesModule {}
