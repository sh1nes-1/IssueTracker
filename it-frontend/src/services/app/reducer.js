import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  user: null,
  access_token: null,
  processing: false,
});

export default function authReducer(state=initialState, {type, ...action}) {
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return state.merge({
        user: action.user,
        access_token: action.access_token
      });
    case actionTypes.SIGN_OUT:
      return state.merge({
        user: null,
        access_token: null
      });

      
    case actionTypes.GET_ACCOUNT_REQUEST:
      return state.merge({
        processing: true
      });
    case actionTypes.GET_ACCOUNT_SUCCESS:
      return state.merge({
        processing: false,
        user: action.user
      });
    case actionTypes.GET_ACCOUNT_FAIL:
      return state.merge({
        processing: false,
        user: null
      });
    case actionTypes.GET_ACCOUNT_ERROR:
      return state.merge({
        processing: false,
        user: null
      });

    default:
      return state;
  }
}