
import { StudentActions, StudentActionTypes } from './student.actions';

export const studentFeatureKey = 'student';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: StudentActions): State {
  switch (action.type) {

    case StudentActionTypes.LoadStudents:
      return state;

    default:
      return state;
  }
}
