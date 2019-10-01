
import { ReviewerActions, ReviewerActionTypes } from './reviewer.actions';

export const reviewerFeatureKey = 'reviewer';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: ReviewerActions): State {
  switch (action.type) {

    case ReviewerActionTypes.LoadReviewers:
      return state;

    default:
      return state;
  }
}
