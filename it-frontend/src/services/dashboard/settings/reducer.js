import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isProcessingCreate: false,
  isSuccessCreate: false,
  isErrorCreate: false,
});

export default function projectsReducer(state=initialState, {type, ...action}) {
  switch (type) {
    case actionTypes.CREATE_PROJECT_ENVIRONMENT_REQUEST:
      return state.merge({
        isProcessingCreate: true,
        isErrorCreate: false,
        isSuccessCreate: false
      });
    case actionTypes.CREATE_PROJECT_ENVIRONMENT_SUCCESS:
      return state.merge({
        isProcessingCreate: false,
        isSuccessCreate: true
      });
    case actionTypes.CREATE_PROJECT_ENVIRONMENT_FAIL:
      return state.merge({
        isProcessingCreate: false,
        isErrorCreate: true
      });
    case actionTypes.CREATE_PROJECT_ENVIRONMENT_ERROR:
      return state.merge({
        isProcessingCreate: false,
      });    


    default:
      return state;
  }
}