import { Action } from '@ngrx/store';
import {ProjectModel} from '../../../models/entities/project.model';
import {Estudiante} from '../../../models/entities/estudiante.model';

export enum ProjectsActionTypes {
  LoadProjects = '[Projects] Load Projects',
  LoadSuccessful = '[Projects] Load Successful',
  LoadFailed = '[Projects] Load failed',

  CreateProject = '[Projects] Create Project',
  CreateSuccessful = '[Projects] Create Successful',
  CreateFailed = '[Projects] Create Failed',

  SelectProject = '[Projects] Select Project name',

  ChangeDescription = '[Projects] Change Project Description',
  ChangeDescriptionS = '[Projects] Change Project Description Successful',
  ChangeDescriptionF = '[Projects] Change Project Description Failed',

  LoadProjectStudents = '[Projects] Load Project Students',
  LoadProjectStudentsS = '[Projects] Load Project Students Successful',
  LoadProjectStudentsF= '[Projects] Load Project Students Failed',
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class LoadSuccessful implements Action {
  readonly  type = ProjectsActionTypes.LoadSuccessful;

  constructor(public projects: ProjectModel[]) {}
}

export class LoadFailed implements  Action {
  readonly  type = ProjectsActionTypes.LoadFailed;
}

export class CreateProject implements Action {
  readonly type = ProjectsActionTypes.CreateProject;

  constructor(public newProject: ProjectModel) {}
}

export class CreateSuccessful implements  Action {
  readonly type = ProjectsActionTypes.CreateSuccessful;
}

export class CreateFailed implements Action {
  readonly  type = ProjectsActionTypes.CreateFailed;
}

export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.SelectProject;

  constructor(public projectName: string) {}
}

export class ChangeDescription implements Action {
  readonly type = ProjectsActionTypes.ChangeDescription;

  constructor(public newProject: ProjectModel) {}
}

export class ChangeDescriptionS implements  Action {
  readonly type = ProjectsActionTypes.ChangeDescriptionS;

  constructor(public newProject: ProjectModel) {}
}

export class ChangeDescriptionF implements Action {
  readonly type = ProjectsActionTypes.ChangeDescriptionF;
}

export class LoadProjectStudents implements  Action {
  readonly type = ProjectsActionTypes.LoadProjectStudents;

  constructor(public projectName: string) {}
}

export class LoadProjectStudentsS implements  Action {
  readonly type = ProjectsActionTypes.LoadProjectStudentsS;

  constructor(public students: Estudiante[]) {}
}

export class LoadProjectStudentsF implements Action {
  readonly type = ProjectsActionTypes.LoadProjectStudentsF;
}

export type ProjectsActions = LoadProjects
  | LoadSuccessful
  | LoadFailed
  | CreateProject
  | CreateSuccessful
  | CreateFailed
  | SelectProject
  | ChangeDescription
  | ChangeDescriptionS
  | ChangeDescriptionF
  | LoadProjectStudents
  | LoadProjectStudentsS
  | LoadProjectStudentsF;
