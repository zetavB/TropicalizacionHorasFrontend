import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewersListComponent } from './components/reviewers-list/reviewers-list.component';
import { ReviewerFormComponent } from './components/reviewer-form/reviewer-form.component';
import { ReviewerProfileComponent } from './components/reviewer-profile/reviewer-profile.component';
import { AddReviewerComponent } from './components/add-reviewer/add-reviewer.component';
import { StoreModule } from '@ngrx/store';
import * as fromReviewer from './state/reviewer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReviewerEffects } from './state/reviewer.effects';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ReviewersListComponent, ReviewerFormComponent, ReviewerProfileComponent, AddReviewerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromReviewer.reviewerFeatureKey, fromReviewer.reducer),
    EffectsModule.forFeature([ReviewerEffects])
  ]
})
export class AdminReviewersModule { }
