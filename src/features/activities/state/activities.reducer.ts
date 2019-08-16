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
  const activitiesArray = [...state.activities];
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

    case ActivityActionTypes.DeleteSuccessful:
      const temp = activitiesArray.find(x => x.idGenerado === action.payload);
      const index = activitiesArray.indexOf(temp);
      activitiesArray.splice(index);
      return {
        ...state,
        activities: activitiesArray
      };

    case ActivityActionTypes.AddSuccessful:
        activitiesArray.push(action.payload);
        return {
          ...state,
          activities: activitiesArray,
          error: ''
        };

    case ActivityActionTypes.DeleteFailed:
      return {
        ...state,
        activities: null,
        error: action.payload
      };

    default:
      return state;
  }
}
