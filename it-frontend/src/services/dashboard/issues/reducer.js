import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isProcessingIssues: false,
  isErrorIssues: false,  
  issues: [],
  totalIssuesCount: 0,

  isProcessingIssue: false,
  isErrorIssue: false,  
  issue: null,

  isProcessingResolve: false,
  isErrorResolve: false,  
  isSuccessResolve: false,

  isProcessingIgnore: false,
  isErrorIgnore: false,  
  isSuccessIgnore: false,  
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

    case actionTypes.SET_ISSUES_LOCAL:
      return state.merge({
        issues: action.issues,
      });
      

    case actionTypes.GET_ISSUE_INFO_REQUEST:
      return state.merge({
        isProcessingIssue: true,
        isErrorIssue: false,        
      });
    case actionTypes.GET_ISSUE_INFO_SUCCESS:
      return state.merge({
        isProcessingIssue: false,
        issue: action.issue,
      });
    case actionTypes.GET_ISSUE_INFO_FAIL:
      return state.merge({
        isProcessingIssue: false,
        isErrorIssue: true,
        issue: null,
      });
    case actionTypes.GET_ISSUE_INFO_ERROR:
      return state.merge({
        isProcessingIssue: false,
      });


    case actionTypes.RESOLVE_ISSUE_REQUEST:
      return state.merge({
        isProcessingResolve: true,
        isErrorResolve: false,
        isSuccessResolve: false, 
      });
    case actionTypes.RESOLVE_ISSUE_SUCCESS:
      return state.merge({
        isProcessingResolve: false,
        isSuccessResolve: true,
      });
    case actionTypes.RESOLVE_ISSUE_FAIL:
      return state.merge({
        isProcessingResolve: false,
        isErrorResolve: true,
      });
    case actionTypes.RESOLVE_ISSUE_ERROR:
      return state.merge({
        isProcessingResolve: false,
      });      


    case actionTypes.IGNORE_ISSUE_REQUEST:
      return state.merge({
        isProcessingIgnore: true,
        isErrorIgnore: false,
        isSuccessIgnore: false,
      });
    case actionTypes.IGNORE_ISSUE_SUCCESS:
      return state.merge({
        isProcessingIgnore: false,
        isSuccessIgnore: true,
      });
    case actionTypes.IGNORE_ISSUE_FAIL:
      return state.merge({
        isProcessingIgnore: false,
        isErrorIgnore: true,
      });
    case actionTypes.IGNORE_ISSUE_ERROR:
      return state.merge({
        isProcessingIgnore: false,
      });

    case actionTypes.SET_ISSUE_LOCAL:
      return state.merge({
        issue: action.issue,
      });

    default:
      return state;
  }
}