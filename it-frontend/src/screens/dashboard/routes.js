import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Issues from "./issues/Issues";
import projects_config from "./projects/routes";
import Settings from "./settings/Settings";

const dashboard_config = [
  {
    path: '/dashboard',
    component: Dashboard,
    routes: [
      ...projects_config,
      {
        key: "issues",
        path: "/dashboard/issues",
        component: Issues
      },
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