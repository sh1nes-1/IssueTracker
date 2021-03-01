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


    default:
      return state;
  }
}