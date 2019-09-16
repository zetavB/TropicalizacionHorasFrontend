import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from './index';
import {Observable, of} from 'rxjs';
import {
  ChangeDescription, ChangeDescriptionF, ChangeDescriptionS,
  CreateFailed,
  CreateProject,
  CreateSuccessful,
  LoadFailed, LoadProjectStudents, LoadProjectStudentsF, LoadProjectStudentsS,
  LoadSuccessful,
  ProjectsActionTypes
} from './projects.actions';
import {catchError, exhaustMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {ProjectsService} from '../projects.service';
import {ProjectModel} from '../../../models/entities/project.model';
import {Estudiante} from '../../../models/entities/estudiante.model';



@Injectable()
export class ProjectsEffects {
  @Effect()
  loadProjects$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects),
    mergeMap(() =>
      this.projectsService.getAllProjects().pipe(
        map((projects: ProjectModel[]) => new LoadSuccessful(projects)),
        catchError(() => of(new LoadFailed()))
      )
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
    exhaustMap((projectName: string) =>
      this.projectsService.getProjectStudents(projectName).pipe(
        map((students: Estudiante[]) => new LoadProjectStudentsS(students)),
        catchError(() => of(new LoadProjectStudentsF()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<State>,
    private projectsService: ProjectsService) {}

}
