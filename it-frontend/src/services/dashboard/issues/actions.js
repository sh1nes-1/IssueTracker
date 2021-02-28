import HttpService from "services/HttpService";
import * as actionTypes from './actionTypes';

export function getProjectInfo(project_id) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.GET_PROJECT_INFO_REQUEST });

      HttpService.get(`/projects/${project_id}`, null, 
        (response) => {
          dispatch({ 
            type: actionTypes.GET_PROJECT_INFO_SUCCESS,
            project: response.project,
          })
        }, 
        () => dispatch({ type: actionTypes.GET_PROJECT_INFO_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_PROJECT_INFO_ERROR });
    }
  }
}

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