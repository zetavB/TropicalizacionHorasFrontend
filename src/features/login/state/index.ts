import {LoginState} from './login.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const getLoginFeatureState = createFeatureSelector<LoginState>('login');

export const getIsLoggedIn = createSelector(
  getLoginFeatureState,
  state => state.isLoggedIn
);

export const getUserToken= createSelector(
  getLoginFeatureState,
  state => state.userToken
);

export const getTokenInfo = createSelector(
  getLoginFeatureState,
  state => state.tokenInfo
);

export const getError = createSelector(
  getLoginFeatureState,
  state => state.error
);
