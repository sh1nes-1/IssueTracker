// import actions
import * as AuthActions from './auth/actions';
import * as ProjectActions from './dashboard/projects/actions';

//import actionTypes
import * as AuthActionTypes from './auth/actionTypes';
import * as ProjectActionTypes from './dashboard/projects/actionTypes';

export const actions =  {
  AuthActions,
  ProjectActions,
};

export const ActionTypes = {
  AuthActionTypes,
  ProjectActionTypes,
};

const defaultExport = { actions, ActionTypes };
export default defaultExport;