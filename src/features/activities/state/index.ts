import * as fromRoot from '../../../app/state/state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ActivityState } from './activities.reducer';
import { getRouterState } from 'src/app/state/router.reducer';

// Extends the app state to include the activity feature.
// This is required because activity is lazy loaded.
// So the reference to ActivityState cannot be added to app/state/state.ts directly.
export interface State extends fromRoot.State {
  activity: ActivityState;
}

const getActivityFeatureState = createFeatureSelector<ActivityState>('activity');


export const getActivityId = createSelector(
  getRouterState,
  state => state.state.params.id
);

export const getActivityStudentEmail = createSelector(
  getActivityFeatureState,
  state => state.activityDetails.estudiante.usuario.correo
);

export const getActivityDetails = createSelector(
  getActivityFeatureState,
  state => state.activityDetails
);

export const getActivityFiles = createSelector(
  getActivityFeatureState,
  state => state.activityFiles
);

export const getActivity = createSelector(
  getActivityFeatureState,
  state => state.activities
);

export const getShowAccepted = createSelector(
  getActivityFeatureState,
  state => state.showAccepted
);
export const getShowDeclined = createSelector(
  getActivityFeatureState,
  state => state.showDeclined
);
export const getShowPending = createSelector(
  getActivityFeatureState,
  state => state.showPending
);

export const getActivityError = createSelector(
  getActivityFeatureState,
  state => state.error
);
