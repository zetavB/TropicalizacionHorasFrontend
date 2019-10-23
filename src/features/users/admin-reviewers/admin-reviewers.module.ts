import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewersListComponent } from './components/reviewers-list/reviewers-list.component';
import { ReviewerProfileComponent } from './components/reviewer-profile/reviewer-profile.component';
import { StoreModule } from '@ngrx/store';
import * as fromReviewer from './state/reviewer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReviewerEffects } from './state/reviewer.effects';
import {ReactiveFormsModule} from '@angular/forms';
import {UserRoutingModule} from '../user-routing.module';
import {CustomMaterialModule} from '../../../app/material.module';



@NgModule({
  declarations: [ReviewersListComponent, ReviewerProfileComponent ],
  exports: [
    ReviewersListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    CustomMaterialModule,
    StoreModule.forFeature(fromReviewer.reviewerFeatureKey, fromReviewer.reducer),
    EffectsModule.forFeature([ReviewerEffects])
  ]
})
export class AdminReviewersModule { }
