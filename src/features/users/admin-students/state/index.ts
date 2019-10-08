import {StudentState} from './student.reducer';
import * as fromRoot from '../../../../app/state/state';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends fromRoot.State {
  students: StudentState;
}

export const  getStudentsFeatureState = createFeatureSelector<StudentState>('students');

// ------------------------------------------------Students List-----------------------------------------
export const getStudentsListState = createSelector(
  getStudentsFeatureState,
  state => state.studentsList
);

export const getStudentsPage = createSelector(
  getStudentsListState,
  state => state.studentsPage
);

export const getStudentsPageContent = createSelector(
  getStudentsListState,
  state => state.studentsPage.content
);


// ------------------------------------------------Student Profile-----------------------------------------
export const getStudentProfileState = createSelector(
  getStudentsFeatureState,
  state => state.studentProfile
);

export const getSelectedStudent = createSelector(
  getStudentProfileState,
  state => state.selectedStudent
);
