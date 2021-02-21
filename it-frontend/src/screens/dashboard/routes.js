import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Issues from "./issues/Issues";
import Projects from "./projects/Projects";
import Settings from "./settings/Settings";

const dashboard_config = [
  {
    path: '/dashboard',
    component: Dashboard,
    routes: [
      {
        key: "projects",
        path: "/dashboard/projects",
        component: Projects
      },
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