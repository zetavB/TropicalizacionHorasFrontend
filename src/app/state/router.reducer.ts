import { ActivatedRouteSnapshot, RouterStateSnapshot, Params} from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {ProjectsState} from '../../features/projects/state/projects.reducer';
import * as fromProjects from '../../features/projects/state/projects.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  projects: ProjectsState;
}

export function defaultReducer<T>(state: T): T { return state; }
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  projects: defaultReducer
};
export function getInitialState() {
  return {
    routerReducer: null,
    projects: fromProjects.initialState
  } as State;
}

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
