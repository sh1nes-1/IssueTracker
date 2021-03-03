import HttpService from "services/HttpService";
import * as actionTypes from './actionTypes';

export function getIssues(options) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.GET_ISSUES_REQUEST });

      HttpService.get('/issues/', options, 
        (response) => {
          dispatch({ 
            type: actionTypes.GET_ISSUES_SUCCESS,
            issues: response.issues,
            totalIssuesCount: response.total_count,
          })
        }, 
        () => dispatch({ type: actionTypes.GET_ISSUES_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_ISSUES_ERROR });
    }
  }
}

export function getIssueInfo(issue_id) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.GET_ISSUE_INFO_REQUEST });

      HttpService.get(`/issues/${issue_id}`, null, 
        (response) => {
          dispatch({ 
            type: actionTypes.GET_ISSUE_INFO_SUCCESS,
            issue: response.issue,
          })
        }, 
        () => dispatch({ type: actionTypes.GET_ISSUE_INFO_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_ISSUE_INFO_ERROR });
    }
  }
}