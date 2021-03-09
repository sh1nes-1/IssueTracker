// import actions
import * as AppActions from './app/actions';
import * as AuthActions from './auth/actions';
import * as ProjectActions from './dashboard/projects/actions';
import * as IssuesActions from './dashboard/issues/actions';
import * as SettingsActions from './dashboard/settings/actions';
import * as AdminActions from './dashboard/admin/actions';

//import actionTypes
import * as AppActionTypes from './app/actionTypes';
import * as AuthActionTypes from './auth/actionTypes';
import * as ProjectActionTypes from './dashboard/projects/actionTypes';
import * as SettingsActionTypes from './dashboard/settings/actionTypes';
import * as AdminActionTypes from './dashboard/settings/actionTypes';

export const actions =  {
  AppActions,
  AuthActions,
  ProjectActions,
  IssuesActions,
  SettingsActions,
  AdminActions,
};

export const ActionTypes = {
  AppActionTypes,
  AuthActionTypes,
  ProjectActionTypes,
  SettingsActionTypes,
  AdminActionTypes,
};

const defaultExport = { actions, ActionTypes };
export default defaultExport;