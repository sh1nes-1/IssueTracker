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

export function resolveIssues(issues_ids) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.RESOLVE_ISSUE_REQUEST });

      HttpService.post(`/issues/resolve`, { issues: issues_ids }, 
        () => dispatch({ type: actionTypes.RESOLVE_ISSUE_SUCCESS }),
        () => dispatch({ type: actionTypes.RESOLVE_ISSUE_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.RESOLVE_ISSUE_ERROR });
    }
  }
}

export function ignoreIssues(issues_ids) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.IGNORE_ISSUE_REQUEST });

      HttpService.post(`/issues/ignore`, { issues: issues_ids }, 
        () => dispatch({ type: actionTypes.IGNORE_ISSUE_SUCCESS }),
        () => dispatch({ type: actionTypes.IGNORE_ISSUE_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.IGNORE_ISSUE_ERROR });
    }
  }
}

export function setIssueLocal(issue) {
  return function (dispatch) {
    dispatch({ 
      type: actionTypes.SET_ISSUE_LOCAL,
      issue: issue, 
    });
  }
}