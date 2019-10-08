import * as fromRoot from '../../../app/state/state';
import {ProjectsState} from './projects.reducer';
import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {ProjectModel} from '../../../models/entities/project.model';
import {Page} from '../../../models/Page';
import {map, withLatestFrom} from 'rxjs/operators';
import {Estudiante} from '../../../models/entities/estudiante.model';
import {StudentToAddModel} from '../components/add-students-to-project/student-to-add.model';
import {Observable} from 'rxjs';


export interface State extends  fromRoot.State {
  projects: ProjectsState;
}

export const getProjectsFeatureState = createFeatureSelector<ProjectsState>('projects');

// -------------------------------- Projects Home ----------------------------------
export const getProjectsListState = createSelector(
  getProjectsFeatureState,
  state => state.projectsList
);

export const getProjectsListProjectsPage = createSelector(
  getProjectsListState,
  state => state.projectsPage
);

export const getProjectsListProjectsPageContent = createSelector(
  getProjectsListState,
  state => state.projectsPage.content
);

export const getProjectsListLoading = createSelector(
  getProjectsListState,
  state => state.loading
);

export const getProjectsListError = createSelector(
  getProjectsListState,
  state => state.error
);

export const getAddProjectState = createSelector(
  getProjectsFeatureState,
  state => state.addProject
);

export const getAddProjectLoading = createSelector(
  getAddProjectState,
  state => state.loading
);

export const getAddProjectError = createSelector(
  getAddProjectState,
  state => state.error
);

// -------------------------------- Project details ----------------------------------
export const getProjectDetailsState = createSelector(
  getProjectsFeatureState,
  state => state.projectDetails
);

export const getProjectDetailsName = createSelector(
  getProjectDetailsState,
  state => state.projectName
);

export const getProjectDetailsProject = createSelector(
  getProjectsListProjectsPage,
  getProjectDetailsName,
  (projects: Page<ProjectModel>, name: string) => {
    const proyecto = projects.content.find(({ nombre }) =>
      nombre === name
    );
    return proyecto === undefined ? {nombre: name} as ProjectModel : proyecto;
  }
);

export const getProjectDetailsStudentsPage = createSelector(
  getProjectDetailsState,
  state => state.studentsPage
);

export const getProjectDetailsStudentsPageContent = createSelector(
  getProjectDetailsState,
  state => state.studentsPage.content
);

// -------------------------------- Add Students ----------------------------------
export const getProjectAddStudentsState = createSelector(
  getProjectsFeatureState,
  state => state.addStudents
);

export const getProjectAddStudentsPage = createSelector(
  getProjectAddStudentsState,
  state => state.studentsPage
);

export const getProjectAddStudentsSelected = createSelector(
  getProjectAddStudentsState,
  state => state.selectedStudents
);

export const getProjectAddStudentsSelectedExist = createSelector(
  getProjectAddStudentsState,
  state => state.selectedStudents.length !== 0
);

export const getProjectAddStudentsContent = createSelector(
  getProjectAddStudentsPage,
  getProjectAddStudentsSelected,
  (page: Page<Estudiante>, selectedStudents: Estudiante[]) => page.content.map((student: Estudiante) => {
    return {
      student,
      selected: selectedStudents.find((selectedStudent) => student.usuario.correo === selectedStudent.usuario.correo ) != null
    } as StudentToAddModel;
  })
);
