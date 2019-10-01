import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {catchError, concatMap, exhaustMap, map} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {
  CategoriesActionTypes,
  CategoriesActions,
  LoadCategoriesS,
  LoadCategoriesF,
  AddCategoryS,
  AddCategoryF,
  DeleteCategoryS, DeleteCategoryF
} from './categories.actions';
import {Action, Store} from '@ngrx/store';
import {State} from './index';
import {CategoriesService} from '../categories.service';



@Injectable()
export class CategoriesEffects {

  @Effect()
  loadCategories$: Observable<Action> = this.actions$.pipe(
    ofType(CategoriesActionTypes.LoadCategories),
    concatMap(() =>
      this.categoriesService.getCategories().pipe(
        map((cats: string[]) => new LoadCategoriesS(cats)),
        catchError(() => of(new LoadCategoriesF()))
      )
    )
  );

  @Effect()
  addCategory$: Observable<Action> = this.actions$.pipe(
    ofType(CategoriesActionTypes.AddCategory),
    map((action) => action.category),
    exhaustMap((cat) =>
      this.categoriesService.addCategory(cat). pipe(
        map(() => new AddCategoryS(cat)),
        catchError(() => of(new AddCategoryF()))
      )
    )
  );

  @Effect()
  deleteCategory: Observable<Action> = this.actions$.pipe(
    ofType(CategoriesActionTypes.DeleteCategory),
    map((action) => action.category),
    exhaustMap((cat) =>
      this.categoriesService.deleteCategory(cat).pipe(
        map(() => new DeleteCategoryS(cat)),
        catchError(() => of(new DeleteCategoryF()))
      )
    )
  );

  constructor(private actions$: Actions<CategoriesActions>,
              private store$: Store<State>,
              private categoriesService: CategoriesService) {}

}
