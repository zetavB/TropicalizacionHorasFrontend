import * as fromRoot from '../../../app/state/state';
import {ProjectsState} from './projects.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export interface State extends  fromRoot.State{
  projects: ProjectsState;
}

export const getProjectsFeatureState = createFeatureSelector<ProjectsState>('projects');

export const getProjectsListState = createSelector(
  getProjectsFeatureState,
  state => state.projectsList
);

export const getProjectsListProjects = createSelector(
  getProjectsListState,
  state => state.projects
);

export const getProjectsListLoading = createSelector(
  getProjectsListState,
  state => state.loading
);

export const getProjectsListError = createSelector(
  getProjectsListState,
  state => state.error
);

export const getAddProjectState = createSelector(
  getProjectsFeatureState,
  state => state.addProject
);

export const getAddProjectLoading = createSelector(
  getAddProjectState,
  state => state.loading
);

export const getAddProjectError = createSelector(
  getAddProjectState,
  state => state.error
);
