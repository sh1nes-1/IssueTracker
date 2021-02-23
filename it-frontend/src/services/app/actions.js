import history from '../../history';
import * as actionTypes from './actionTypes';
import HttpService from "services/HttpService";

export function retrieve() {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.GET_ACCOUNT_REQUEST });

      HttpService.get('/profile', null, 
        (response) => {
          dispatch({ 
            type: actionTypes.GET_ACCOUNT_SUCCESS, 
            user: response.user
          });
        }, 
        () => dispatch({ type: actionTypes.GET_ACCOUNT_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_ACCOUNT_ERROR });
    }
  }
}

export function logout() {
  localStorage.removeItem('jwt_access_token');
  localStorage.removeItem('user');
  history.replace('/login');
  window.location.reload();
}