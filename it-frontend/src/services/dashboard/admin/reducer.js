import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isProcessingCreateUser: false,
  isSuccessCreateUser: false,
  isErrorCreateUser: false,
  errorsCreateUser: null,

  isProcessingGetUsers: false,
  isSuccessGetUsers: false,
  isErrorGetUsers: false,
  users: [],

  selectedUser: null,
  
});

export default function projectsReducer(state=initialState, {type, ...action}) {
  switch (type) {
    case actionTypes.CREATE_USER_REQUEST:
      return state.merge({
        isProcessingCreateUser: true,
        isErrorCreateUser: false,
        isSuccessCreateUser: false
      });
    case actionTypes.CREATE_USER_SUCCESS:
      return state.merge({
        isProcessingCreateUser: false,
        isSuccessCreateUser: true
      });
    case actionTypes.CREATE_USER_FAIL:
      return state.merge({
        isProcessingCreateUser: false,
        isErrorCreateUser: true,
        errorsCreateUser: action.errors,
      });
    case actionTypes.CREATE_USER_ERROR:
      return state.merge({
        isProcessingCreateUser: false,
      });


    case actionTypes.GET_USERS_REQUEST:
      return state.merge({
        isProcessingGetUsers: true,
        isErrorGetUsers: false,        
      });
    case actionTypes.GET_USERS_SUCCESS:
      return state.merge({
        isProcessingGetUsers: false,
        users: action.users
      });
    case actionTypes.GET_USERS_FAIL:
      return state.merge({
        isProcessingGetUsers: false,
        isErrorGetUsers: true
      });
    case actionTypes.GET_USERS_ERROR:
      return state.merge({
        isProcessingGetUsers: false,
      });


    case actionTypes.SELECT_USER_LOCAL:
      return state.merge({
        selectedUser: action.selectedUser,
      });

    default:
      return state;
  }
}