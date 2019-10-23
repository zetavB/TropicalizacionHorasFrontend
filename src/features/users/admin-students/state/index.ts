import {StudentState} from './student.reducer';
import * as fromRoot from '../../../../app/state/state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getProjectsListProjectsPageContent} from '../../../projects/state';
import {ProjectToAddModel} from '../../../projects/components/student-projects-edit/project-to-add.model';
import {ProjectsState} from '../../../projects/state/projects.reducer';

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

export const getSelectedStudentProjects = createSelector(
  getSelectedStudent,
  state => state.proyectos.map(p => p.nombre)
);

// ------------------------------------------------Edit Projects-----------------------------------------
export const getStudentEditProjects = createSelector(
  getStudentsFeatureState,
  state => state.editProjects
);

export const getStudentProjects = createSelector(
  getStudentEditProjects,
  state => state.selectedProjects
);

export const getStudentProjectsWithSelected = createSelector(
  getStudentProjects,
  getProjectsListProjectsPageContent,
  (studentProjects, projects) => projects.map(project => {
    return {
      project,
      selected: studentProjects.find(p2 => p2 === project.nombre) !== undefined
    } as ProjectToAddModel;
  })
);
