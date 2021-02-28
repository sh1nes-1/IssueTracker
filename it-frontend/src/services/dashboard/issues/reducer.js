import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isProcessingIssues: false,
  isErrorIssues: false,  
  issues: [],
  totalIssuesCount: 0,

  isProcessingProject: false,
  isErrorProject: false,  
  project: null,
});

export default function projectsReducer(state=initialState, {type, ...action}) {
  switch (type) {
    case actionTypes.GET_ISSUES_REQUEST:
      return state.merge({
        isProcessingIssues: true,
        isErrorIssues: false,        
      });
    case actionTypes.GET_ISSUES_SUCCESS:
      return state.merge({
        isProcessingIssues: false,
        issues: action.issues,
        totalIssuesCount: action.totalIssuesCount,
      });
    case actionTypes.GET_ISSUES_FAIL:
      return state.merge({
        isProcessingIssues: false,
        isErrorIssues: true
      });
    case actionTypes.GET_ISSUES_ERROR:
      return state.merge({
        isProcessingIssues: false,
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