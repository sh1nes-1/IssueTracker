// import actions
import * as AppActions from './app/actions';
import * as AuthActions from './auth/actions';
import * as ProjectActions from './dashboard/projects/actions';
import * as IssuesActions from './dashboard/issues/actions';
import * as SettingsActions from './dashboard/settings/actions';

//import actionTypes
import * as AppActionTypes from './app/actionTypes';
import * as AuthActionTypes from './auth/actionTypes';
import * as ProjectActionTypes from './dashboard/projects/actionTypes';
import * as SettingsActionTypes from './dashboard/settings/actionTypes';

export const actions =  {
  AppActions,
  AuthActions,
  ProjectActions,
  IssuesActions,
  SettingsActions,
};

export const ActionTypes = {
  AppActionTypes,
  AuthActionTypes,
  ProjectActionTypes,
  SettingsActionTypes,
};

const defaultExport = { actions, ActionTypes };
export default defaultExport;