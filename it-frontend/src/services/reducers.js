import { combineReducers } from 'redux';

import AppReducer from './app/reducer';
import AuthReducer from './auth/reducer';
import ProjectsReducer from './dashboard/projects/reducer';
import IssuesReducer from './dashboard/issues/reducer';

export const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  projects: ProjectsReducer,
  issues: IssuesReducer,
});