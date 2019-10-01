import { Action } from '@ngrx/store';

export enum CategoriesActionTypes {
  LoadCategories = '[Categories] Load Categories',
  LoadCategoriesS = '[Categories] Load Successful',
  LoadCategoriesF = '[Categories] Load Failed',

  AddCategory = '[Categories] Add Category',
  AddCategoryS = '[Categories] Add Category successful',
  AddCategoryF = '[Categories] Add Category failed',

  DeleteCategory = '[Categories] Delete category',
  DeleteCategoryS = '[Categories] Delete category successful',
  DeleteCategoryF = '[Categories] Delete category failed',
}

export class LoadCategories implements Action {
  readonly type = CategoriesActionTypes.LoadCategories;
}
export class LoadCategoriesS implements Action {
  readonly type = CategoriesActionTypes.LoadCategoriesS;

  constructor(public categories: string[]) {}
}
export class LoadCategoriesF implements Action {
  readonly type = CategoriesActionTypes.LoadCategoriesF;
}

export class AddCategory implements Action {
  readonly type = CategoriesActionTypes.AddCategory;

  constructor(public category: string) {}
}
export class AddCategoryS implements Action {
  readonly type = CategoriesActionTypes.AddCategoryS;

  constructor(public category: string) {}
}
export class AddCategoryF implements Action {
  readonly type = CategoriesActionTypes.AddCategoryF;
}

export class DeleteCategory implements Action {
  readonly type = CategoriesActionTypes.DeleteCategory;

  constructor(public category: string) {}
}
export class DeleteCategoryS implements Action {
  readonly type = CategoriesActionTypes.DeleteCategoryS;

  constructor(public category: string) {}
}
export class DeleteCategoryF implements Action {
  readonly type = CategoriesActionTypes.DeleteCategoryF;
}

export type CategoriesActions = LoadCategories
  | LoadCategoriesS
  | LoadCategoriesF
  | AddCategory
  | AddCategoryS
  | AddCategoryF
  | DeleteCategory
  | DeleteCategoryS
  | DeleteCategoryF;
