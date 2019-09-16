import {ProjectsActions, ProjectsActionTypes} from './projects.actions';
import {ProjectModel} from '../../../models/entities/project.model';
import {Estudiante} from '../../../models/entities/estudiante.model';


export const projectsFeatureKey = 'projects';

export interface ProjectsState {
  projectsList: {
    projects: ProjectModel[];
    loading: boolean
    error: boolean;
    currentPage: number;
  };
  addProject: {
    loading: boolean;
    error: boolean;
  };
  projectDetails: {
    projectName: string;
    students: Estudiante[];
    loadingEdit: boolean;
    errorEdit: boolean;
    loadingStudents: boolean;
    errorStudents: boolean;
  };
}

export const initialState: ProjectsState = {
  projectsList: {
    projects: [],
    loading: false,
    error: false,
    currentPage: 1,
  },
  addProject: {
    loading: false,
    error: false
  },
  projectDetails: {
    projectName: '',
    students: [],
    loadingEdit: false,
    errorEdit: false,
    loadingStudents: false,
    errorStudents: false
  }
};

export function reducer(state = initialState, action: ProjectsActions): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.LoadProjects:
      return {
        ...state,
        projectsList: {
          ...state.projectsList,
          loading: true
        }
      };
    case ProjectsActionTypes.LoadSuccessful:
      return {
        ...state,
        projectsList: {
          ...state.projectsList,
          loading: false,
          error: false,
          projects: action.projects
        }
      };
    case ProjectsActionTypes.LoadFailed:
      return {
        ...state,
        projectsList: {
          ...state.projectsList,
          loading: false,
          error: true,
          projects: []
        }
      };
    case ProjectsActionTypes.CreateProject:
      return {
        ...state,
        addProject: {
          ...state.addProject,
          loading: true
        }
      };
    case ProjectsActionTypes.CreateSuccessful:
      return {
        ...state,
        addProject: {
          loading: false,
          error: false
        }
      };
    case ProjectsActionTypes.CreateFailed:
      return {
        ...state,
        addProject: {
          loading: false,
          error: true
        }
      };
    case ProjectsActionTypes.SelectProject:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          projectName: action.projectName
        }
      };
    case ProjectsActionTypes.ChangeDescription:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          loadingEdit: true
        }
      };
    case ProjectsActionTypes.ChangeDescriptionS:
      return {
        ...state,
        projectsList: {
          ...state.projectsList,
          projects: [
            // Add the changed project
            action.newProject,
            // Remove the old one but copy the rest of the array
            ...state.projectsList.projects.filter(
              (p: ProjectModel) => p.nombre !== action.newProject.nombre)
          ]
        },
        projectDetails: {
          ...state.projectDetails,
          loadingEdit: false,
          errorEdit: false
        }
      };
    case ProjectsActionTypes.ChangeDescriptionF:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          loadingEdit: false,
          errorEdit: true
        }
      };
    case ProjectsActionTypes.LoadProjectStudents:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          loadingStudents: true
        }
      };
    case ProjectsActionTypes.LoadProjectStudentsS:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          students: action.students,
          loadingStudents: false,
          errorStudents: false
        }
      };
    case ProjectsActionTypes.LoadProjectStudentsF:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          loadingStudents: false,
          errorStudents: true
        }
      };
    default:
      return state;
  }
}
