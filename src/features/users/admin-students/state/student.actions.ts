import { Action } from '@ngrx/store';
import {Estudiante} from '../../../../models/entities/estudiante.model';
import {Activity} from '../../../../models/entities/activity.model';
import {Page} from '../../../../models/Page';

export enum StudentActionTypes {
  LoadStudents = '[Students] Load Students',
  LoadStudentsS = '[Students] Load Students successful',
  LoadStudentsF = '[Students] Load Students failed',
  ChangeStudentsPage = '[Students] Change students page',

  SelectStudent = '[Students] Select Student',

  LoadStudentActivities = '[Students] Load student activities',
  LoadStudentActivitiesS = '[Students] Load student activities successful',
  LoadStudentActivitiesF = '[Students] Load student activities failed',
  ChangeStudentActivitiesPage = '[Students] Change Students activities page',

  SelectStudentProjects = '[Students] Select student projects',
  SelectProject = '[Students] Select Project',
  DeselectProject = '[Students] Deselect Project',
  EditStudentProjects = '[Students] Edit Student Projects',
  EditStudentProjectsS = '[Students] Edit Student Projects successful',
  EditStudentProjectsF = '[Students] Edit Student Projects failed',

  AddStudent = '[Students] Add student',
  AddStudentS = '[Students] Add student successful',
  AddStudentF = '[Students] Add student failed',

  EditStudent = '[Students] Edit student',
  EditStudentS = '[Students] Edit student successful',
  EditStudentF = '[Students] Edit student failed',

  DeleteStudent = '[Students] Delete student',
  DeleteStudentS = '[Students] Delete student successful',
  DeleteStudentF = '[Students] Delete student failed',
}

export class LoadStudents implements Action {
  readonly type = StudentActionTypes.LoadStudents;
}
export class LoadStudentsS implements Action {
  readonly type = StudentActionTypes.LoadStudentsS;

  constructor(public students: Page<Estudiante>) {}
}
export class LoadStudentsF implements Action {
  readonly type = StudentActionTypes.LoadStudentsF;
}
export class ChangeStudentsPage implements Action {
  readonly type = StudentActionTypes.ChangeStudentsPage;

  constructor(public newSize: number, public newNumber: number) {}
}

export class SelectStudent implements Action {
  readonly type = StudentActionTypes.SelectStudent;

  constructor(public email: string) {}
}

export class LoadStudentActivities implements Action {
  readonly type = StudentActionTypes.LoadStudentActivities;

  constructor(public email: string) {}
}
export class LoadStudentActivitiesS implements Action {
  readonly type = StudentActionTypes.LoadStudentActivitiesS;

  constructor(public activities: Page<Activity>) {}
}
export class LoadStudentActivitiesF implements Action {
  readonly type = StudentActionTypes.LoadStudentActivitiesF;
}
export class ChangeStudentActivitiesPage implements Action {
  readonly type = StudentActionTypes.ChangeStudentActivitiesPage;

  constructor(public newSize: number, public newNumber: number) {}
}

export class SelectStudentProjects implements Action {
  readonly type = StudentActionTypes.SelectStudentProjects;
}
export class SelectProject implements Action {
  readonly type = StudentActionTypes.SelectProject;

  constructor(public projectName: string) {}
}
export class DeselectProject implements Action {
  readonly type = StudentActionTypes.DeselectProject;

  constructor(public projectName: string) {}
}
export class EditStudentProjects implements Action {
  readonly type = StudentActionTypes.EditStudentProjects;
}
export class EditStudentProjectsS implements Action {
  readonly type = StudentActionTypes.EditStudentProjectsS;

  constructor(public studentEmail: string) {}
}
export class EditStudentProjectsF implements Action {
  readonly type = StudentActionTypes.EditStudentProjectsF;
}

export class AddStudent implements Action {
  readonly type = StudentActionTypes.AddStudent;

  constructor(public student: Estudiante) {}
}
export class AddStudentS implements Action {
  readonly type = StudentActionTypes.AddStudentS;

  constructor(public student: Estudiante) {}
}
export class AddStudentF implements Action {
  readonly type = StudentActionTypes.AddStudentF;
}

export class EditStudent implements Action {
  readonly type = StudentActionTypes.EditStudent;

  constructor(public newStudent: Estudiante) {}
}
export class EditStudentS implements Action {
  readonly type = StudentActionTypes.EditStudentS;

  constructor(public newStudent: Estudiante) {}
}
export class EditStudentF implements Action {
  readonly type = StudentActionTypes.EditStudentF;
}

export class DeleteStudent implements Action {
  readonly type = StudentActionTypes.DeleteStudent;

  constructor(public email: string) {}
}
export class DeleteStudentS implements Action {
  readonly type = StudentActionTypes.DeleteStudentS;

  constructor(public email: string) {}
}
export class DeleteStudentF implements Action {
  readonly type = StudentActionTypes.DeleteStudentF;
}

export type StudentActions = LoadStudents
  | LoadStudentsS
  | LoadStudentsF
  | ChangeStudentsPage
  | SelectStudent
  | LoadStudentActivities
  | LoadStudentActivitiesS
  | LoadStudentActivitiesF
  | ChangeStudentActivitiesPage
  | SelectStudentProjects
  | SelectProject
  | DeselectProject
  | EditStudentProjects
  | EditStudentProjectsS
  | EditStudentProjectsF
  | AddStudent
  | AddStudentS
  | AddStudentF
  | EditStudent
  | EditStudentS
  | EditStudentF
  | DeleteStudent
  | DeleteStudentS
  |  DeleteStudentF;
