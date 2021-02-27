import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import projects_config from "./projects/routes";
import issues_config from "./issues/routes";
import Settings from "./settings/Settings";

const dashboard_config = [
  {
    path: '/dashboard',
    component: Dashboard,
    routes: [
      ...projects_config,
      ...issues_config,
      {
        key: "settings",
        path: "/dashboard/settings",
        component: Settings
      },      
      {        
        path: "/dashboard",
        component: () => <Redirect to="/dashboard/projects"/>
      }
    ]
  }
];

export default dashboard_config;