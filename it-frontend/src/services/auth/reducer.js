import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  processing: false,
  error: false,

});

export default function authReducer(state=initialState, {type, ...action}) {
  switch (type) {
    case actionTypes.SIGN_IN_REQUEST:
      return state.merge({
        processing: true,
        error: false
      });
    case actionTypes.SIGN_IN_SUCCESS:
      return state.merge({
          processing: false,
          error: false,
      });
    case actionTypes.SIGN_IN_FAIL:
      return state.merge({
          processing: false,
          error: true
      });
    case actionTypes.SIGN_IN_ERROR:
      return state.merge({
          processing: false,
      });
      
    default:
      return state;
  }
}