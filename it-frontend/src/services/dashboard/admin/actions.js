import HttpService from "services/HttpService";
import * as actionTypes from './actionTypes';

export function createUser(user) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.CREATE_USER_REQUEST });

      HttpService.post('/users/', user, 
        () => dispatch({ type: actionTypes.CREATE_USER_SUCCESS }), 
        (response) => {
          if (response?.errors) {
            dispatch({ 
              type: actionTypes.CREATE_USER_FAIL,
              errors: response.errors,
            })
          }
        }
      );

    } catch (error) {
      dispatch({ type: actionTypes.CREATE_USER_ERROR });
    }
  }
}
