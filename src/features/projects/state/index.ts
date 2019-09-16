import * as fromRoot from '../../../app/state/state';
import {ProjectsState} from './projects.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProjectModel} from '../../../models/entities/project.model';


export interface State extends  fromRoot.State {
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

export const getProjectDetailsState = createSelector(
  getProjectsFeatureState,
  state => state.projectDetails
);

export const getProjectDetailsName = createSelector(
  getProjectDetailsState,
  state => state.projectName
);

export const getProjectDetailsProject = createSelector(
  getProjectsListProjects,
  getProjectDetailsName,
  (projects: ProjectModel[], name: string) => {
    return projects.find(({ nombre }) =>
      nombre === name
    );
  }
);

export const getProjectDetailsStudents = createSelector(
  getProjectDetailsState,
  state => state.students
);
