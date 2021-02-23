import history from '../../history';
import * as actionTypes from './actionTypes';
const { default: HttpService } = require("services/HttpService");

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
        () => {
          dispatch({ type: actionTypes.GET_ACCOUNT_FAIL });
          dispatch(logout());
        }
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