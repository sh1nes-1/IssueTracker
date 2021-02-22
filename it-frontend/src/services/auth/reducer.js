import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isProcessing: false,
  isError: false,
});

export default function authReducer(state=initialState, {type, ...action}) {
  switch (type) {
    case actionTypes.SIGN_IN_REQUEST:
      return state.merge({
        isProcessing: true,
        isError: false
      });
    case actionTypes.SIGN_IN_SUCCESS:
      return state.merge({
        isProcessing: false,
        isError: false,
      });
    case actionTypes.SIGN_IN_FAIL:
      return state.merge({
        isProcessing: false,
        isError: true
      });
    case actionTypes.SIGN_IN_ERROR:
      return state.merge({
        isProcessing: false,
      });
      
    default:
      return state;
  }
}