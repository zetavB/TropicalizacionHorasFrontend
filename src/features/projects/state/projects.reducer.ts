import {ProjectsActions, ProjectsActionTypes} from './projects.actions';
import {ProjectModel} from '../../../models/entities/project.model';
import {Estudiante} from '../../../models/entities/estudiante.model';
import {Page} from '../../../models/Page';

export const projectsFeatureKey = 'projects';

export interface ProjectsState {
  projectsList: {
    projectsPage: Page<ProjectModel>
    loading: boolean
    error: boolean;
  };
  addProject: {
    loading: boolean;
    error: boolean;
  };
  projectDetails: {
    projectName: string;
    studentsPage: Page<Estudiante>;
    loadingEdit: boolean;
    errorEdit: boolean;
    loadingStudents: boolean;
    errorStudents: boolean;
    loadingRemoveStudent: boolean;
    errorRemovingStudent: boolean;
    loadingStudent: boolean;
    errorLoadingStudent: boolean;
  };
  addStudents: {
    studentsPage: Page<Estudiante>,
    selectedStudents: Estudiante[],
    loadingStudents: boolean,
    loadingAddStudents: boolean,
    errorLoadingStudents: boolean,
    errorAddingStudents: boolean
  };
}

export const initialState: ProjectsState = {
  projectsList: {
    projectsPage: {
      content: [],
      number: 0,
      size: 5,
      totalElements: 0,
      totalPages: 0
    },
    loading: false,
    error: false,
  },
  addProject: {
    loading: false,
    error: false
  },
  projectDetails: {
    projectName: '',
    studentsPage: {
      content: [],
      number: 0,
      size: 5,
      totalElements: 0,
      totalPages: 0
    },
    loadingEdit: false,
    errorEdit: false,
    loadingStudents: false,
    errorStudents: false,
    loadingRemoveStudent: false,
    errorRemovingStudent: false,
    loadingStudent: false,
    errorLoadingStudent: false
  },
  addStudents: {
    studentsPage: {
      content: [],
      number: 0,
      size: 5,
      totalElements: 0,
      totalPages: 0
    },
    selectedStudents: [],
    loadingStudents: false,
    loadingAddStudents: false,
    errorLoadingStudents: false,
    errorAddingStudents: false
  }
}
;

export function reducer(state = initialState, action: ProjectsActions): ProjectsState {
  switch (action.type) {
    // -------------- Project home ------------------------
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
          projectsPage: action.projects
        }
      };
    case ProjectsActionTypes.LoadFailed:
      return {
        ...state,
        projectsList: {
          ...state.projectsList,
          loading: false,
          error: true,
          projectsPage: {
            ...state.projectsList.projectsPage,
            content: []
          }
        }
      };
    case ProjectsActionTypes.ProjectsListChangePage:
      return {
        ...state,
        projectsList: {
          ...state.projectsList,
          projectsPage: {
            ...state.projectsList.projectsPage,
            number: action.newNumber,
            size: action.newSize
          }
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
        projectsList: {
          ...state.projectsList,
          projectsPage: {
            ...state.projectsList.projectsPage,
            content: [action.newProject, ...state.projectsList.projectsPage.content]
          }
        },
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
      // ---------------------------- Project details ------------------------
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
          projectsPage: {
            ...state.projectsList.projectsPage,
            content: [
              // Add the changed project
              action.newProject,
              // Remove the old one but copy the rest of the array
              ...state.projectsList.projectsPage.content.filter(
                (p: ProjectModel) => p.nombre !== action.newProject.nombre)
            ]
          }
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
          studentsPage: action.students,
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
    case ProjectsActionTypes.ProjectStudentsChangePage:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          studentsPage: {
            ...state.projectDetails.studentsPage,
            number: action.newNumber,
            size: action.newSize
          }
        }
      };
    case ProjectsActionTypes.ProjectRemoveStudent:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          loadingRemoveStudent: true
        }
      };
    case ProjectsActionTypes.ProjectRemoveStudentS:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          loadingRemoveStudent: false,
          studentsPage: {
            ...state.projectDetails.studentsPage,
            content: [...state.projectDetails.studentsPage.content]
              .filter(student => student.usuario.correo !== action.studentMail)
          }
        }
      };
    case ProjectsActionTypes.ProjectRemoveStudentF:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          errorRemovingStudent: true,
          loadingRemoveStudent: false
        }
      };
    case ProjectsActionTypes.LoadProject:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          loadingStudent: true,
        }
      };
    case ProjectsActionTypes.LoadProjectS:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          loadingStudent: false,
          errorLoadingStudent: false,
        },
        projectsList: {
          ...state.projectsList,
          projectsPage: {
            ...state.projectsList.projectsPage,
            content: [...state.projectsList.projectsPage.content, action.proyecto]
          }
        }
      };
      // ---------------------------- Project add students -----------------
    case ProjectsActionTypes.LoadProjectNotStudents:
      return {
        ...state,
        addStudents: {
          ...state.addStudents,
          loadingStudents: true
        }
      };
    case ProjectsActionTypes.LoadProjectNotStudentsS:
      return {
        ...state,
        addStudents: {
          ...state.addStudents,
          loadingStudents: false,
          studentsPage: action.studentsRetrieved
        }
      };
    case ProjectsActionTypes.LoadProjectNotStudentsF:
      return {
        ...state,
        addStudents: {
          ...state.addStudents,
          loadingStudents: false,
          errorLoadingStudents: true
        }
      };
    case ProjectsActionTypes.ProjectNotStudentsChangePage:
      return {
        ...state,
        addStudents: {
          ...state.addStudents,
          studentsPage: {
            ...state.addStudents.studentsPage,
            number: action.newNumber,
            size: action.newSize
          }
        }
      };
    case ProjectsActionTypes.SelectStudent:
      return {
        ...state,
        addStudents: {
          ...state.addStudents,
          selectedStudents: [
            action.studentSelected,
            ...state.addStudents.selectedStudents
          ]
        }
      };
    case ProjectsActionTypes.DeselectStudent:
      return {
        ...state,
        addStudents: {
          ...state.addStudents,
          selectedStudents: [
            ...state.addStudents.selectedStudents.filter(
              (s: Estudiante) => s.usuario.correo !== action.deselectedStudent.usuario.correo
            )
          ]
        }
      };
    case ProjectsActionTypes.AddStudentsToProject:
      return {
        ...state,
        addStudents: {
          ...state.addStudents,
          loadingAddStudents: true
        }
      };
    case ProjectsActionTypes.AddStudentsToProjectS:
      return {
        ...state,
        addStudents: {
          ...state.addStudents,
          loadingAddStudents: false,
          selectedStudents: []
        }
      };
    case ProjectsActionTypes.AddStudentsToProjectF:
      return {
        ...state,
        addStudents: {
          ...state.addStudents,
          loadingAddStudents: false,
          errorAddingStudents: true
        }
      };
    default:
      return state;
  }
}
