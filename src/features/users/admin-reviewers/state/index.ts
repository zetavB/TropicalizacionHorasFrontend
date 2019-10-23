import * as fromRoot from '../../../../app/state/state';
import {ReviewerState} from './reviewer.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends fromRoot.State {
  reviewers: ReviewerState;
}

export const  getReviewersFeatureState = createFeatureSelector<ReviewerState>('reviewers');

// ------------------------------------------------Reviewers List-----------------------------------------
export const getReviewersListState = createSelector(
  getReviewersFeatureState,
  state => state.reviewersList
);

export const getReviewersPage = createSelector(
  getReviewersListState,
  state => state.reviewersPage
);

export const getReviewersPageContent = createSelector(
  getReviewersListState,
  state => state.reviewersPage.content
);


// ------------------------------------------------Reviewer Profile-----------------------------------------
export const getReviewerProfileState = createSelector(
  getReviewersFeatureState,
  state => state.reviewerProfile
);

export const getSelectedReviewer = createSelector(
  getReviewerProfileState,
  state => state.selectedReviewer
);
