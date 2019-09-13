import {ProjectsActions, ProjectsActionTypes} from './projects.actions';
import {Activity} from '../../../models/entities/activity.model';
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
    activities: Activity[];
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
    activities: [],
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
          projects: action.payload
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
          projectName: action.payload
        }
      };
    default:
      return state;
  }
}
