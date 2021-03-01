import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import projects_config from "./projects/routes";
import issues_config from "./issues/routes";
import settings_config from "./settings/routes";

const dashboard_config = [
  {
    path: '/dashboard',
    component: Dashboard,
    routes: [
      ...projects_config,
      ...issues_config,
      ...settings_config,    
      {
        path: "/dashboard",
        component: () => <Redirect to="/dashboard/projects"/>
      }
    ]
  }
];

export default dashboard_config;