import { combineReducers } from 'redux';

import AppReducer from './app/reducer';
import AuthReducer from './auth/reducer';
import ProjectsReducer from './dashboard/projects/reducer';

export const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  projects: ProjectsReducer,
});