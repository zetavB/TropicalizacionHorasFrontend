import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import {CustomMaterialModule} from '../../app/material.module';
import { ActivitiesService } from './activities.service';

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FormsModule,
    CustomMaterialModule
  ],
  declarations: [
    ActivitiesComponent
  ],
  providers: [ ActivitiesService ]
})
export class ActivitiesModule {}
