import { Action } from '@ngrx/store';
import {ProjectModel} from '../../../models/entities/project.model';
import {Estudiante} from '../../../models/entities/estudiante.model';
import {Page} from '../../../models/Page';

export enum ProjectsActionTypes {
  LoadProjects = '[Projects] Load Projects',
  LoadSuccessful = '[Projects] Load Successful',
  LoadFailed = '[Projects] Load failed',
  ProjectsListChangePage = '[Projects] Projects list change page',
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
  ProjectStudentsChangePage = '[Projects] Project students list change page',

  LoadProjectNotStudents = '[Projects] Load Students not on project',
  LoadProjectNotStudentsS = '[Projects] Load Students not on project successful',
  LoadProjectNotStudentsF = '[Projects] Load Students not on project failed',
  ProjectNotStudentsChangePage = '[Projects] Project not students list change page',
  SelectStudent = '[Projects] Select student to add to project',
  DeselectStudent = '[Project] De select student',
  AddStudentsToProject = '[Projects] Add students to project',
  AddStudentsToProjectS =  '[Projects] Add students to project successful',
  AddStudentsToProjectF =  '[Projects] Add students to project failed',
}

// ---------------------------------------Projects home---------------------------------------------
export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class LoadSuccessful implements Action {
  readonly  type = ProjectsActionTypes.LoadSuccessful;

  constructor(public projects: Page<ProjectModel>) {}
}

export class LoadFailed implements  Action {
  readonly  type = ProjectsActionTypes.LoadFailed;
}

export class ProjectsListChangePage implements  Action {
  readonly type = ProjectsActionTypes.ProjectsListChangePage;

  constructor(public newNumber: number, public newSize: number) {}
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

// --------------------------------------Project details ----------------------------------------------
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

  constructor(public students: Page<Estudiante>) {}
}

export class LoadProjectStudentsF implements Action {
  readonly type = ProjectsActionTypes.LoadProjectStudentsF;
}

export class ProjectStudentsChangePage implements  Action {
  readonly type = ProjectsActionTypes.ProjectStudentsChangePage;

  constructor(public newSize: number, public newNumber: number) {}
}
// ------------------------Add students----------------------------------------------------------------
export class LoadProjectNotStudents implements  Action {
  readonly type = ProjectsActionTypes.LoadProjectNotStudents;

  constructor(public projectName: string) {}
}

export class LoadProjectNotStudentsS implements  Action {
  readonly  type = ProjectsActionTypes.LoadProjectNotStudentsS;

  constructor(public studentsRetrieved: Page<Estudiante>) {}
}

export class LoadProjectNotStudentsF implements  Action {
  readonly type = ProjectsActionTypes.LoadProjectNotStudentsF;
}

export class ProjectNotStudentsChangePage implements  Action {
  readonly type = ProjectsActionTypes.ProjectNotStudentsChangePage;

  constructor(public newNumber: number, public newSize: number) {}
}

export class SelectStudent implements Action {
  readonly type = ProjectsActionTypes.SelectStudent;

  constructor(public studentSelected: Estudiante) {}
}

export class DeselectStudent implements Action {
  readonly type = ProjectsActionTypes.DeselectStudent;

  constructor(public deselectedStudent: Estudiante) {}
}

export class AddStudentsToProject implements Action {
  readonly type = ProjectsActionTypes.AddStudentsToProject;
}

export class AddStudentsToProjectS implements Action {
  readonly type = ProjectsActionTypes.AddStudentsToProjectS;
}

export class AddStudentsToProjectF implements Action {
  readonly type = ProjectsActionTypes.AddStudentsToProjectF;
}

export type ProjectsActions = LoadProjects
  | LoadSuccessful
  | LoadFailed
  | ProjectsListChangePage
  | CreateProject
  | CreateSuccessful
  | CreateFailed
  | SelectProject
  | ChangeDescription
  | ChangeDescriptionS
  | ChangeDescriptionF
  | LoadProjectStudents
  | LoadProjectStudentsS
  | LoadProjectStudentsF
  | ProjectStudentsChangePage
  | LoadProjectNotStudents
  | LoadProjectNotStudentsS
  | LoadProjectNotStudentsF
  | ProjectNotStudentsChangePage
  | SelectStudent
  | DeselectStudent
  | AddStudentsToProject
  | AddStudentsToProjectS
  | AddStudentsToProjectF;
