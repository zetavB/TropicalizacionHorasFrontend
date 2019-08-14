import { Activity } from 'src/models/activity.model';
import { ActivityActions, ActivityActionTypes } from './activities.actions';

export interface ActivityState {
  activities: Activity[];
  error: string;
}

const initialState: ActivityState = {
  activities: [],
  error: ''
};

export function reducer(state = initialState, action: ActivityActions): ActivityState {
  switch (action.type) {
    case ActivityActionTypes.LoadSuccessful:
      return {
        ...state,
        activities: action.payload,
        error: ''
      };

    case ActivityActionTypes.LoadFailed:
      return {
        ...state,
        activities: null,
        error: action.payload
      };

    default:
      return state;
  }
}
