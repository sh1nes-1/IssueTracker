import history from '../../history';
import * as actionTypes from './actionTypes';
import HttpService from "services/HttpService";

export function retrieve() {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.GET_ACCOUNT_REQUEST });

      HttpService.get('/auth/profile', null, 
        (response) => {
          //localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('user_role', response.user.role);
          
          dispatch({ 
            type: actionTypes.GET_ACCOUNT_SUCCESS, 
            user: response.user,
          });
        }, 
        () => dispatch({ type: actionTypes.GET_ACCOUNT_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_ACCOUNT_ERROR });
    }
  }
}

// i think that it does not used
export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  history.replace('/login');
  window.location.reload();
}