import {ActivityActions, ActivityActionTypes} from './activities.actions';
import {Activity} from '../../../models/entities/activity.model';

export interface ActivityState {
  activities: Activity[];
  showAccepted: boolean;
  showPending: boolean;
  showDeclined: boolean;
  activityDetails: Activity;
  activityFiles: string[];
  error: string;
  progress: [];
}

const initialState: ActivityState = {
  activities: [],
  showAccepted: true,
  showPending: true,
  showDeclined: true,
  error: '',
  progress: [],
  activityDetails: {
    idGenerado: 0,
    fecha: '',
    horas: 0,
    estado: '',
    categoria: {nombre: ''},
    proyecto: {nombre: ''},
    estudiante: {usuario: {correo: ''}},
    detalles: '',
    justificacionRechazo: null
  },
  activityFiles: []
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
    case ActivityActionTypes.ChangeShowAccepted:
      return {
        ...state,
        showAccepted: !state.showAccepted
      };
    case ActivityActionTypes.ChangeShowPending:
      return {
        ...state,
        showPending: !state.showPending
      };
    case ActivityActionTypes.ChangeShowDeclined:
      return {
        ...state,
        showDeclined: !state.showDeclined
      };

    case ActivityActionTypes.LoadActivityDetailsSuccessful:
      return {
        ...state,
        activityDetails: action.payload.activity,
        activityFiles: action.payload.files
      };


  case ActivityActionTypes.LoadActivityDetailsFail:
      return {
        ...state,
        error: action.payload
      };

    case ActivityActionTypes.DeleteSuccessful:
      const temp = activitiesArray.find(x => x.idGenerado === action.payload);
      const index = activitiesArray.indexOf(temp);
      activitiesArray.splice(index, 1);
      return {
        ...state,
        activities: activitiesArray
      };

    case ActivityActionTypes.DeleteFailed:
      return {
        ...state,
        activities: null,
        error: action.payload
      };

    case ActivityActionTypes.AddSuccessful:
        activitiesArray.push(action.payload);
        return {
          ...state,
          activities: activitiesArray,
          error: '',
          progress: []
        };

    case ActivityActionTypes.AddFailed:
      return {
        ...state,
        error: action.payload,
        progress: []
      };

    default:
      return state;
  }
}
