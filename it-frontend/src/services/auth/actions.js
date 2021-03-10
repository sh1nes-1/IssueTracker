import HttpService from "services/HttpService";
import * as actionTypes from './actionTypes';
import * as appActionTypes from '../app/actionTypes';
import history from '../../history';

export function signIn(email, password) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.SIGN_IN_REQUEST });

      HttpService.post('/auth/login/', { email, password }, 
        (response) => {
          //localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('user_role', response.user.role);
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          HttpService.setToken(response.access_token);
          HttpService.setRefreshToken(response.refresh_token);

          dispatch({ type: actionTypes.SIGN_IN_SUCCESS });

          dispatch({ 
            type: appActionTypes.LOGIN_SUCCESS, 
            access_token: response.access_token,
            user: response.user
          });
            
          // maybe some automatic redirect work
          history.push('/dashboard/projects');
        }, 
        () => dispatch({ type: actionTypes.SIGN_IN_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.SIGN_IN_ERROR });
    }
  }
}