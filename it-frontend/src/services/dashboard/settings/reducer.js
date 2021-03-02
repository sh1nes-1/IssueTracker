import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isProcessingCreate: false,
  isSuccessCreate: false,
  isErrorCreate: false,

  isProcessingEnvironment: false,
  isErrorEnvironment: false,
  environment: null,
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


    case actionTypes.GET_ENVIRONMENT_INFO_REQUEST:
      return state.merge({
        isProcessingEnvironment: true,
        isErrorEnvironment: false,        
      });
    case actionTypes.GET_ENVIRONMENT_INFO_SUCCESS:
      return state.merge({
        isProcessingEnvironment: false,
        environment: action.environment,
      });
    case actionTypes.GET_ENVIRONMENT_INFO_FAIL:
      return state.merge({
        isProcessingEnvironment: false,
        isErrorEnvironment: true,
        environment: null,
      });
    case actionTypes.GET_ENVIRONMENT_INFO_ERROR:
      return state.merge({
        isProcessingEnvironment: false,
      });

    default:
      return state;
  }
}