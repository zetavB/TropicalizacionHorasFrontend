import * as fromRoot from '../../../app/state/state';
import {ProfileState} from './profile.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

// Extends the app state to include the profile feature.
// This is required because profile is lazy loaded.
// So the reference to ProfileState cannot be added to app/state/state.ts directly.
export interface State extends fromRoot.State {
  profile: ProfileState;
}

const getProfileFeatureState = createFeatureSelector<ProfileState>('profile');

export const getProfileStudent = createSelector(
  getProfileFeatureState,
  state => state.estudiante
);

export const getProfileError = createSelector(
  getProfileFeatureState,
  state => state.error
);

export const getPendingHours = createSelector(
  getProfileFeatureState,
  state => state.pendingHours
);
