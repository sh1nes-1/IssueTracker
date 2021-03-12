import React from "react";
import { Redirect } from "react-router-dom";
import App from "../screens/App";
import auth_config from "../screens/auth/routes";
import dashboard_config from "../screens/dashboard/routes";
import error_config from "../screens/error/routes";

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/projects"/>
      },
      ...auth_config,
      ...dashboard_config,
      
      ...error_config
    ]
  }
];

export default routes;