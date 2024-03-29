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

export function getUsers() {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.GET_USERS_REQUEST });

      HttpService.get('/users/', null, 
        (response) => {
          dispatch({ 
            type: actionTypes.GET_USERS_SUCCESS, 
            users: response.users,
            totalCount: response.total_count,
          });
        }, 
        () => dispatch({ type: actionTypes.GET_USERS_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_USERS_ERROR });
    }
  }
}

export function updateUser(user) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.UPDATE_USER_REQUEST });

      HttpService.post(`/users/${user.id}`, user, 
        () => dispatch({ type: actionTypes.UPDATE_USER_SUCCESS }), 
        (response) => {
          if (response?.errors) {
            dispatch({ 
              type: actionTypes.UPDATE_USER_FAIL,
              errors: response.errors,
            });
          }
        }
      );
    } catch (error) {
      dispatch({ type: actionTypes.UPDATE_USER_ERROR });
    }
  }
}

export function setSelectedUser(user) {
  return function (dispatch) {
    dispatch({ 
      type: actionTypes.SELECT_USER_LOCAL, 
      selectedUser: user,
    });
  }
}

export function getUserInfo(user_id) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.GET_USER_INFO_REQUEST });

      HttpService.get(`/users/${user_id}`, null, 
        (response) => {
          dispatch({ 
            type: actionTypes.GET_USER_INFO_SUCCESS,
            user: response.user,
          })
        }, 
        () => dispatch({ type: actionTypes.GET_USER_INFO_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_USER_INFO_ERROR });
    }
  }
}