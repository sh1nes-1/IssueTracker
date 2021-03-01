import React from 'react';
import { Redirect } from "react-router-dom";
import EnvironmentSettings from './environment/Environment';
import Environments from "./environments/Environments";
import General from './general/General';
import Settings from "./Settings";

const settings_config = [
  {
    key: "settings",
    path: "/dashboard/settings",
    component: Settings,
    routes: [
      {
        key: "settings",
        subkey: "general",
        path: "/dashboard/settings/general",
        exact: true,
        component: General
      },      
      {
        key: "settings",
        subkey: "environments",
        path: "/dashboard/settings/environments",
        exact: true,
        component: Environments
      },
      {
        key: "settings",
        subkey: "environments",
        path: "/dashboard/settings/environments/:id",
        component: EnvironmentSettings
      },      
      {
        path: "/dashboard/settings",
        component: () => <Redirect to="/dashboard/"/>
      }      
    ]
  }
];

export default settings_config;