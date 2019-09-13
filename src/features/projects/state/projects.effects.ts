import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from './index';
import {Observable, of} from 'rxjs';
import {CreateFailed, CreateProject, CreateSuccessful, LoadFailed, LoadSuccessful, ProjectsActionTypes} from './projects.actions';
import {catchError, exhaustMap, map, mergeMap} from 'rxjs/operators';
import {ProjectsService} from '../projects.service';
import {ProjectModel} from '../../../models/entities/project.model';



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
    map((action: CreateProject) => action.payload),
    exhaustMap((project: ProjectModel) =>
      this.projectsService.createProject(project).pipe(
        map(() => new CreateSuccessful()),
        catchError(() => of(new CreateFailed()))
      )
    )
  );


  constructor(
    private actions$: Actions,
    private store$: Store<State>,
    private projectsService: ProjectsService) {}

}
