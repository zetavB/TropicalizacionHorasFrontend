import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FormsModule,
  ],
  declarations: [
    ActivitiesComponent
  ],
  providers: [ ]
})
export class ActivitiesModule {}
