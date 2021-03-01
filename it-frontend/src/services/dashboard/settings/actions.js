import HttpService from "services/HttpService";
import * as actionTypes from './actionTypes';

export function createProjectEnvironment(project_id, name) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.CREATE_PROJECT_ENVIRONMENT_REQUEST });

      HttpService.post('/environments/', { project_id, name }, 
        () => dispatch({ type: actionTypes.CREATE_PROJECT_ENVIRONMENT_SUCCESS }), 
        () => dispatch({ type: actionTypes.CREATE_PROJECT_ENVIRONMENT_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.CREATE_PROJECT_ENVIRONMENT_ERROR });
    }
  }
}
