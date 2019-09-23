import { Injectable } from '@angular/core';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from './index';
import {Observable, of} from 'rxjs';
import {
  ChangeDescription,
  ChangeDescriptionF,
  ChangeDescriptionS,
  CreateFailed,
  CreateProject,
  CreateSuccessful,
  LoadFailed, LoadProjectNotStudents,
  LoadProjectNotStudentsF, LoadProjectNotStudentsS,
  LoadProjects,
  LoadProjectStudents,
  LoadProjectStudentsF,
  LoadProjectStudentsS,
  LoadSuccessful,
  ProjectsActionTypes, ProjectStudentsChangePage
} from './projects.actions';
import {catchError, exhaustMap, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {ProjectsService} from '../projects.service';
import {ProjectModel} from '../../../models/entities/project.model';
import {Estudiante} from '../../../models/entities/estudiante.model';
import {Page} from '../../../models/Page';



@Injectable()
export class ProjectsEffects {
  @Effect()
  loadProjects$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects),
    withLatestFrom(this.store$),
    mergeMap(([action, state]: [LoadProjects, State]) =>
      this.projectsService.getAllProjects(
        state.projects.projectsList.projectsPage.number,
        state.projects.projectsList.projectsPage.size
      ).pipe(
        map((projects: Page<ProjectModel>) => new LoadSuccessful(projects)),
        catchError(() => of(new LoadFailed()))
      )
    )
  );

  @Effect()
  projectsListChangePage$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.ProjectsListChangePage),
    map( () =>
      new LoadProjects()
    )
  );

  @Effect()
  createProject$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.CreateProject),
    map((action: CreateProject) => action.newProject),
    exhaustMap((project: ProjectModel) =>
      this.projectsService.createProject(project).pipe(
        map(() => new CreateSuccessful()),
        catchError(() => of(new CreateFailed()))
      )
    )
  );

  @Effect()
  changeDescription$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.ChangeDescription),
    map((a: ChangeDescription) => a.newProject),
    switchMap((p: ProjectModel) =>
      this.projectsService.changeDescription(p).pipe(
        map(() => new ChangeDescriptionS(p)),
        catchError(() => of(new ChangeDescriptionF()))
      )
    )
  );

  @Effect()
  loadStudents$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjectStudents),
    map((a: LoadProjectStudents) => a.projectName),
    withLatestFrom(this.store$),
    exhaustMap(([projectName, state]: [string, State]) =>
      this.projectsService.getProjectStudents(
        projectName,
        state.projects.projectDetails.studentsPage.number,
        state.projects.projectDetails.studentsPage.size
      ).pipe(
        map((students: Page<Estudiante>) => new LoadProjectStudentsS(students)),
        catchError(() => of(new LoadProjectStudentsF()))
      )
    )
  );

  @Effect()
  projectStudentsChangePage$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.ProjectStudentsChangePage),
    withLatestFrom(this.store$),
    map( ([action, state]: [ProjectStudentsChangePage, State]) =>
      new LoadProjectStudents(state.projects.projectDetails.projectName)
    )
  );

  @Effect()
  loadNotStudents$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjectNotStudents),
    map((a: LoadProjectStudents) => a.projectName),
    withLatestFrom(this.store$),
    exhaustMap( ([projectName, state]: [string, State]) =>
      this.projectsService.getNotStudents(
        projectName,
        state.projects.addStudents.studentsPage.number,
        state.projects.addStudents.studentsPage.size
      ).pipe(
        map((students: Page<Estudiante>) => new LoadProjectNotStudentsS(students)),
        catchError(() => of(new LoadProjectNotStudentsF()))
      )
    )
  );

  @Effect()
  projectNotStudentsChangePage$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.ProjectNotStudentsChangePage),
    withLatestFrom(this.store$),
    map( ([action, state]: [ProjectStudentsChangePage, State]) =>
      new LoadProjectNotStudents(state.projects.projectDetails.projectName)
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<State>,
    private projectsService: ProjectsService) {}

}
