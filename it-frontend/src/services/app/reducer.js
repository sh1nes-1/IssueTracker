import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  user: null,
});

export default function authReducer(state=initialState, {type, ...action}) {
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return state.merge({
        user: action.user
      });
    default:
      return state;
  }
}