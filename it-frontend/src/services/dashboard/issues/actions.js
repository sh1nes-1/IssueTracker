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