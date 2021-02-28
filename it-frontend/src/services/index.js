// import actions
import * as AppActions from './app/actions';
import * as AuthActions from './auth/actions';
import * as ProjectActions from './dashboard/projects/actions';
import * as IssuesActions from './dashboard/issues/actions';

//import actionTypes
import * as AppActionTypes from './app/actionTypes';
import * as AuthActionTypes from './auth/actionTypes';
import * as ProjectActionTypes from './dashboard/projects/actionTypes';

export const actions =  {
  AppActions,
  AuthActions,
  ProjectActions,
  IssuesActions,
};

export const ActionTypes = {
  AppActionTypes,
  AuthActionTypes,
  ProjectActionTypes,
};

const defaultExport = { actions, ActionTypes };
export default defaultExport;