import React from 'react';
import { Redirect } from "react-router-dom";
import UserDetails from './users/details/UserDetails';
import UsersManaging from './users/list/Users';

const admin_config = [
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
];

export default admin_config;