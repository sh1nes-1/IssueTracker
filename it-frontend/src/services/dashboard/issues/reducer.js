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

    default:
      return state;
  }
}