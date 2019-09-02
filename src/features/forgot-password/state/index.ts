import * as fromRoot from '../../../app/state/state';
import {ForgotPasswordState} from './forgot-password.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends fromRoot.State {
  forgotPassword: ForgotPasswordState;
}

const getForgotPasswordFeatureState = createFeatureSelector<ForgotPasswordState>('forgotPassword');

export const getForgotPasswordEmail = createSelector(
  getForgotPasswordFeatureState,
  state => state.email
);

export const getForgotPasswordTokenError = createSelector(
  getForgotPasswordFeatureState,
  state => state.tokenError
);

export const getForgotPasswordNewPasswordError = createSelector(
  getForgotPasswordFeatureState,
  state => state.newPasswordError
);

export const getForgotPasswordShowSpinner = createSelector(
  getForgotPasswordFeatureState,
  state => state.showSpinner
);
