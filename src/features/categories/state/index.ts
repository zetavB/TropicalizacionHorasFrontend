import {CategoriesState} from './categories.reducer';
import * as fromRoot from '../../../app/state/state';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends fromRoot.State {
  categories: CategoriesState;
}

export const getCategoriesFeatureState = createFeatureSelector<CategoriesState>('categories');

export const getCategories = createSelector(
  getCategoriesFeatureState,
  state => state.categories
);
