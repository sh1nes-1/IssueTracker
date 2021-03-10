import React from 'react';
import { Redirect } from 'react-router-dom';
import Admin from './Admin';
import UserDetails from './users/details/UserDetails';
import UsersManaging from './users/list/Users';

const admin_config = [  
  {
    path: "/dashboard/admin",
    component: Admin,
    routes: [
      {
        key: "admin_users",
        path: "/dashboard/admin/users",
        exact: true,
        component: UsersManaging,
      },
      {
        key: "admin_users",
        path: "/dashboard/admin/users/:id",
        component: UserDetails,
      },
      {
        path: "/dashboard/admin",
        component: () => <Redirect to="/dashboard/"/>
      }       
    ]
  }  
];

export default admin_config;