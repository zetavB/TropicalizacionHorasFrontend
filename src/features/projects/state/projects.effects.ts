import { Injectable } from '@angular/core';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {getProjectAddStudentsSelected, State} from './index';
import {Observable, of} from 'rxjs';
import {
  AddStudentsToProject, AddStudentsToProjectF, AddStudentsToProjectS,
  ChangeDescription,
  ChangeDescriptionF,
  ChangeDescriptionS,
  CreateFailed,
  CreateProject,
  CreateSuccessful,
  LoadFailed, LoadProject, LoadProjectF, LoadProjectNotStudents,
  LoadProjectNotStudentsF, LoadProjectNotStudentsS, LoadProjectS,
  LoadProjects,
  LoadProjectStudents,
  LoadProjectStudentsF,
  LoadProjectStudentsS,
  LoadSuccessful, ProjectRemoveStudent, ProjectRemoveStudentF, ProjectRemoveStudentS,
  ProjectsActionTypes, ProjectStudentsChangePage
} from './projects.actions';
import {catchError, concatMap, exhaustMap, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {ProjectsService} from '../projects.service';
import {ProjectModel} from '../../../models/entities/project.model';
import {Estudiante} from '../../../models/entities/estudiante.model';
import {Page} from '../../../models/Page';
import {Router} from '@angular/router';



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
    map( () => new LoadProjects())
  );

  @Effect()
  createProject$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.CreateProject),
    map((action: CreateProject) => action.newProject),
    exhaustMap((project: ProjectModel) =>
      this.projectsService.createProject(project).pipe(
        map(() => new CreateSuccessful(project)),
        catchError(() => of(new CreateFailed()))
      )
    )
  );

  // --------------------------Project details----------------------------------
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
  projectRemoveStudent$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.ProjectRemoveStudent),
    withLatestFrom(this.store$),
    map(([action, state]: [ProjectRemoveStudent, State]) => [action.student.usuario.correo, state.projects.projectDetails.projectName]),
    exhaustMap(([student, projectName]: [string, string]) =>
      this.projectsService.removeStudent(projectName, student).pipe(
        map(() => new ProjectRemoveStudentS(student)),
        catchError(() => of(new ProjectRemoveStudentF()))
      )
    )
  );

  @Effect()
  projectLoadProject$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProject),
    map((action: LoadProject) => action.name),
    concatMap((name: string) =>
      this.projectsService.getProject(name).pipe(
        map((project: ProjectModel) => new LoadProjectS(project)),
        catchError(() => of(new LoadProjectF()))
      )
    )
  );
  // -----------------------------------------Add students----------------------------
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

  @Effect()
  addStudentsToProject$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.AddStudentsToProject),
    withLatestFrom(this.store$),
    map(([action, state]: [AddStudentsToProject, State]) =>
      [
        state.projects.projectDetails.projectName,
        state.projects.addStudents.selectedStudents.map((student) => student.usuario.correo)
      ]
    ),
    mergeMap(([projectName, selectedStudents]: [string, string[]]) =>
      this.projectsService.addStudentsToProject(projectName, selectedStudents).pipe(
        map(() => new AddStudentsToProjectS()),
        catchError(() => of(new AddStudentsToProjectF()))
      )
    )
  );

  @Effect({dispatch: false})
  addStudentsToProjectS$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.AddStudentsToProjectS),
    withLatestFrom(this.store$),
    map(([action, state]: [Action, State]) => state.projects.projectDetails.projectName),
    tap((projectName: string) => this.router.navigate(['proyectos/detalles/', projectName]))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<State>,
    private projectsService: ProjectsService,
    private router: Router) {}

}
