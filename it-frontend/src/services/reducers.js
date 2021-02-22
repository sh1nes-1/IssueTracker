import { combineReducers } from 'redux';

import AuthReducer from './auth/reducer';
import ProjectsReducer from './dashboard/projects/reducer';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  projects: ProjectsReducer,
});