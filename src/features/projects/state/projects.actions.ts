import { Action } from '@ngrx/store';
import {ProjectModel} from '../../../models/entities/project.model';

export enum ProjectsActionTypes {
  LoadProjects = '[Projects] Load Projects',
  LoadSuccessful = '[Projects] Load Successful',
  LoadFailed = '[Projects] Load failed',

  CreateProject = '[Projects] Create Project',
  CreateSuccessful = '[Projects] Create Successful',
  CreateFailed = '[Projects] Create Failed',

  SelectProject = '[Projects] Select Project name'
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class LoadSuccessful implements Action {
  readonly  type = ProjectsActionTypes.LoadSuccessful;

  constructor(public payload: ProjectModel[]) {}
}

export class LoadFailed implements  Action {
  readonly  type = ProjectsActionTypes.LoadFailed;
}

export class CreateProject implements Action {
  readonly type = ProjectsActionTypes.CreateProject;

  constructor(public payload: ProjectModel) {}
}

export class CreateSuccessful implements  Action {
  readonly type = ProjectsActionTypes.CreateSuccessful;
}

export class CreateFailed implements Action {
  readonly  type = ProjectsActionTypes.CreateFailed;
}

export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.SelectProject;

  constructor(public payload: string) {}
}


export type ProjectsActions = LoadProjects
  | LoadSuccessful
  | LoadFailed
  | CreateProject
  | CreateSuccessful
  | CreateFailed
  | SelectProject;
