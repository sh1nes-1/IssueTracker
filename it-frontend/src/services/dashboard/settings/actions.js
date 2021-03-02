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

export function getEnvironmentInfo(environment_id, silent = false) {
  return function (dispatch) {
    try {
      if (silent) {
        dispatch({ type: actionTypes.GET_ENVIRONMENT_INFO_SILENT });
      } else {
        dispatch({ type: actionTypes.GET_ENVIRONMENT_INFO_REQUEST });
      }

      HttpService.get(`/environments/${environment_id}`, null, 
        (response) => {
          dispatch({ 
            type: actionTypes.GET_ENVIRONMENT_INFO_SUCCESS,
            environment: response.environment,
          })
        }, 
        () => dispatch({ type: actionTypes.GET_ENVIRONMENT_INFO_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_ENVIRONMENT_INFO_ERROR });
    }
  }
}

export function updateEnvironment(environment_id, name) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.UPDATE_ENVIRONMENT_REQUEST });

      HttpService.post(`/environments/${environment_id}`, { name }, 
        () => dispatch({ type: actionTypes.UPDATE_ENVIRONMENT_SUCCESS }), 
        () => dispatch({ type: actionTypes.UPDATE_ENVIRONMENT_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.UPDATE_ENVIRONMENT_ERROR });
    }
  }
}
