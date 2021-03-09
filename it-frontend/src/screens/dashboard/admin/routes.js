import React from 'react';
import { Redirect } from "react-router-dom";
import UsersManaging from './users/Users';

const admin_config = [
  {
    key: "admin_users",
    path: "/dashboard/admin/users",
    component: UsersManaging,
  }
];

export default admin_config;