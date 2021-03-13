import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isProcessingCreate: false,
  isSuccessCreate: false,
  isErrorCreate: false,

  isProcessingGet: false,  
  isErrorGet: false,
  projects: [],

  isProcessingProject: false,
  isErrorProject: false,  
  project: null,

  isProcessingUpdate: false,
  isSuccessUpdate: false,
  isErrorUpdate: false,    

  isProcessingDelete: false,
  isSuccessDelete: false,
  isErrorDelete: false,   
});

export default function projectsReducer(state=initialState, {type, ...action}) {
  switch (type) {
    case actionTypes.CREATE_PROJECT_REQUEST:
      return state.merge({
        isProcessingCreate: true,
        isErrorCreate: false,
        isSuccessCreate: false
      });
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return state.merge({
        isProcessingCreate: false,
        isSuccessCreate: true
      });
    case actionTypes.CREATE_PROJECT_FAIL:
      return state.merge({
        isProcessingCreate: false,
        isErrorCreate: true
      });
    case actionTypes.CREATE_PROJECT_ERROR:
      return state.merge({
        isProcessingCreate: false,
      });
      

    case actionTypes.GET_PROJECTS_REQUEST:
      return state.merge({
        isProcessingGet: true,
        isErrorGet: false,        
      });
    case actionTypes.GET_PROJECTS_SUCCESS:
      return state.merge({
        isProcessingGet: false,
        projects: action.projects
      });
    case actionTypes.GET_PROJECTS_FAIL:
      return state.merge({
        isProcessingGet: false,
        isErrorGet: true
      });
    case actionTypes.GET_PROJECTS_ERROR:
      return state.merge({
        isProcessingGet: false,
      });


    case actionTypes.GET_PROJECT_INFO_REQUEST:
      return state.merge({
        isProcessingProject: true,
        isErrorProject: false,        
      });
    case actionTypes.GET_PROJECT_INFO_SUCCESS:
      return state.merge({
        isProcessingProject: false,
        project: action.project,
      });
    case actionTypes.GET_PROJECT_INFO_FAIL:
      return state.merge({
        isProcessingProject: false,
        isErrorProject: true,
        project: null,
      });
    case actionTypes.GET_PROJECT_INFO_ERROR:
      return state.merge({
        isProcessingProject: false,
      });


    case actionTypes.UPDATE_PROJECT_REQUEST:
      return state.merge({
        isProcessingUpdate: true,
        isErrorUpdate: false,
        isSuccessUpdate: false
      });
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return state.merge({
        isProcessingUpdate: false,
        isSuccessUpdate: true
      });
    case actionTypes.UPDATE_PROJECT_FAIL:
      return state.merge({
        isProcessingUpdate: false,
        isErrorUpdate: true
      });
    case actionTypes.UPDATE_PROJECT_ERROR:
      return state.merge({
        isProcessingUpdate: false,
      });


    case actionTypes.SET_PROJECT_LOCAL:
      return state.merge({
        project: action.project,
      });

      case actionTypes.SET_PROJECTS_LOCAL:
        return state.merge({
          projects: action.projects,
        });      


    case actionTypes.DELETE_PROJECT_REQUEST:
      return state.merge({
        isProcessingDelete: true,
        isErrorDelete: false,
        isSuccessDelete: false
      });
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return state.merge({
        isProcessingDelete: false,
        isSuccessDelete: true
      });
    case actionTypes.DELETE_PROJECT_FAIL:
      return state.merge({
        isProcessingDelete: false,
        isErrorDelete: true
      });
    case actionTypes.DELETE_PROJECT_ERROR:
      return state.merge({
        isProcessingDelete: false,
      });
  

    default:
      return state;
  }
}