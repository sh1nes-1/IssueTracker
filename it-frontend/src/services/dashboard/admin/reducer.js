import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isProcessingCreateUser: false,
  isSuccessCreateUser: false,
  isErrorCreateUser: false,
  errorsCreateUser: null,
  
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

    default:
      return state;
  }
}