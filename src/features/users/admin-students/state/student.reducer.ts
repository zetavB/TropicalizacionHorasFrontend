import {StudentActions, StudentActionTypes} from './student.actions';
import {Estudiante} from '../../../../models/entities/estudiante.model';
import {Page} from '../../../../models/Page';
import {Activity} from '../../../../models/entities/activity.model';

export const studentFeatureKey = 'students';

export interface StudentState {
  studentsList: {
    studentsPage: Page<Estudiante>,
    loadingStudents: boolean,
    errorLoadingStudents: boolean
  };
  studentProfile: {
    selectedStudent: Estudiante,
    activitiesPage: Page<Activity>,
    loadingActivities: boolean,
    errorLoadingActivities: boolean,
  };
  editProjects: {
    selectedProjects: string[]
  };
  editStudent: {
    loading: boolean,
    error: boolean
  };
  addStudent: {
    loading: boolean,
    error: boolean
  };
  deleteStudent: {
    loading: boolean,
    error: boolean
  };
}

export const initialState: StudentState = {
  studentsList: {
    studentsPage: {
      size: 5,
      number: 0,
      content: [],
      totalElements: 0,
      totalPages: 0
    },
    loadingStudents: false,
    errorLoadingStudents: false
  },
  studentProfile: {
    selectedStudent: null,
    activitiesPage: {
      size: 5,
      number: 0,
      content: [],
      totalElements: 0,
      totalPages: 0
    },
    loadingActivities: false,
    errorLoadingActivities: false,
  },
  editProjects: {
    selectedProjects: []
  },
  editStudent: {
    loading: false,
    error: false
  },
  addStudent: {
    loading: false,
    error: false
  },
  deleteStudent: {
    loading: false,
    error: false
  }
};

export function reducer(state = initialState, action: StudentActions): StudentState {
  switch (action.type) {
    case StudentActionTypes.LoadStudents:
      return {
        ...state,
        studentsList: {
          ...state.studentsList,
          loadingStudents: true
        }
      };
    case StudentActionTypes.LoadStudentsS:
      return {
        ...state,
        studentsList: {
          ...state.studentsList,
          loadingStudents: false,
          studentsPage: action.students
        }
      };
    case StudentActionTypes.LoadStudentsF:
      return {
        ...state,
        studentsList: {
          ...state.studentsList,
          loadingStudents: false,
          errorLoadingStudents: true
        }
      };
    case StudentActionTypes.ChangeStudentsPage:
      return {
        ...state,
        studentsList: {
          ...state.studentsList,
          studentsPage: {
            ...state.studentsList.studentsPage,
            number: action.newNumber,
            size: action.newSize
          }
        }
      };

    case StudentActionTypes.SelectStudent:
      return {
        ...state,
        studentProfile: {
          ...state.studentProfile,
          loadingActivities: true,
          selectedStudent: state.studentsList.studentsPage.content.find(student => student.usuario.correo === action.email)
        }
      };
    case  StudentActionTypes.LoadStudentActivities:
      return {
        ...state,
        studentProfile: {
          ...state.studentProfile,
          loadingActivities: true,
        }
      };
    case  StudentActionTypes.LoadStudentActivitiesS:
      return {
        ...state,
        studentProfile: {
          ...state.studentProfile,
          activitiesPage: action.activities,
          loadingActivities: false,
          errorLoadingActivities: false
        }
      };
    case  StudentActionTypes.LoadStudentActivitiesF:
      return {
        ...state,
        studentProfile: {
          ...state.studentProfile,
          loadingActivities: false,
          errorLoadingActivities: true
        }
      };
    case StudentActionTypes.ChangeStudentActivitiesPage:
      return {
        ...state,
        studentProfile: {
          ...state.studentProfile,
          activitiesPage: {
            ...state.studentProfile.activitiesPage,
            number: action.newNumber,
            size: action.newSize
          }
        }
      };
    case StudentActionTypes.SelectStudentProjects:
      return {
        ...state,
        editProjects: {
          selectedProjects: [...state.studentProfile.selectedStudent.proyectos.map(p => p.nombre)]
        }
      };
    case StudentActionTypes.SelectProject:
      return {
        ...state,
        editProjects: {
          selectedProjects: [...state.editProjects.selectedProjects, action.projectName]
        }
      };
    case StudentActionTypes.DeselectProject:
      return {
        ...state,
        editProjects: {
          selectedProjects: [...state.editProjects.selectedProjects.filter(p => p !== action.projectName)]
        }
      };
    case StudentActionTypes.AddStudent:
      return {
        ...state,
        addStudent: {
          ...state.addStudent,
          loading: true
        }
      };
    case StudentActionTypes.AddStudentS:
      return {
        ...state,
        addStudent: {
          loading: false,
          error: false
        }
      };
    case StudentActionTypes.AddStudentF:
      return {
        ...state,
        addStudent: {
          loading: false,
          error: true
        }
      };

    case StudentActionTypes.EditStudent:
      return {
        ...state,
        editStudent: {
          ...state.editStudent,
          loading: true
        }
      };
    case StudentActionTypes.EditStudentS:
      return {
        ...state,
        editStudent: {
          loading: false,
          error: false
        }
      };
    case StudentActionTypes.EditStudentF:
      return {
        ...state,
        editStudent: {
          loading: false,
          error: true
        }
      };

    case StudentActionTypes.DeleteStudent:
      return {
        ...state,
        deleteStudent: {
          ...state.deleteStudent,
          loading: true
        }
      };
    case StudentActionTypes.DeleteStudentS:
      return {
        ...state,
        deleteStudent: {
          loading: false,
          error: false
        }
      };
    case StudentActionTypes.DeleteStudentF:
      return {
        ...state,
        deleteStudent: {
          loading: false,
          error: true
        }
      };

    default:
      return state;
  }
}
