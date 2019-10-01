import {CategoriesActions, CategoriesActionTypes} from './categories.actions';

export const categoriesFeatureKey = 'categories';

export interface CategoriesState {
  categories: string[];
  loadingCategories: boolean;
  loadingAddCategory: boolean;
  loadingDeleteCategory: boolean;
  errorLoadingCategories: boolean;
  errorAddingCategory: boolean;
  errorDeletingCategory: boolean;
}

export const initialState: CategoriesState = {
  categories: [],
  loadingCategories: false,
  loadingAddCategory: false,
  loadingDeleteCategory: false,
  errorLoadingCategories: false,
  errorAddingCategory: false,
  errorDeletingCategory: false
};

export function reducer(state = initialState, action: CategoriesActions): CategoriesState {
  switch (action.type) {
    case CategoriesActionTypes.LoadCategories:
      return {
        ...state,
        loadingCategories: true
      };
    case CategoriesActionTypes.LoadCategoriesS:
      return {
        ...state,
        categories: action.categories,
        loadingCategories: false
      };
    case CategoriesActionTypes.LoadCategoriesF:
      return {
        ...state,
        loadingCategories: false,
        errorLoadingCategories: true
      };
    case CategoriesActionTypes.AddCategory:
      return {
        ...state,
        loadingAddCategory: true
      };
    case CategoriesActionTypes.AddCategoryS:
      return {
        ...state,
        categories: [...state.categories, action.category],
        loadingAddCategory: false
      };
    case CategoriesActionTypes.AddCategoryF:
      return {
        ...state,
        loadingAddCategory: false,
        errorAddingCategory: true
      };
    case CategoriesActionTypes.DeleteCategory:
      return {
        ...state,
        loadingDeleteCategory: true
      };
    case CategoriesActionTypes.DeleteCategoryS:
      return {
        ...state,
        categories: [...state.categories].filter(cat => cat !== action.category),
        loadingDeleteCategory: false
      };
    case CategoriesActionTypes.DeleteCategoryF:
      return {
        ...state,
        loadingDeleteCategory: false,
        errorDeletingCategory: true
      };
    default:
      return state;
  }
}
