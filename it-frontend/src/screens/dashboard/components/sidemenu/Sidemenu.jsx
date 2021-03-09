import React from 'react';
import {  Layout, Menu  } from 'antd';
import { FolderOutlined, ContainerOutlined, SettingOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { matchRoutes } from "react-router-config";
import queryString from 'query-string';
import LogoutModal from './LogoutModal';
import { logout } from 'services/startup';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Sider } = Layout;

function Sidemenu({ routes }) {
  const location = useLocation();
  const branch = matchRoutes(routes, location.pathname);
  const currentRouteKey = branch[0]?.route?.key?.toString() ?? "";
  const params = queryString.parse(location.search);
  const isProjectSelected = 'project_id' in params;
  const isAdminRoute = currentRouteKey.includes('admin');

  const onLogout = () => {
    logout();
  }

  return (
    <Sider breakpoint="lg">
      <div className="logo" />

      <Menu theme="dark" mode="inline" selectedKeys={[currentRouteKey]} defaultOpenKeys={isAdminRoute ? ['admin'] : []}>
        <Menu.Item key="projects" icon={<FolderOutlined />}>
          <NavLink to={`/dashboard/projects${location.search}`}>Projects</NavLink>
        </Menu.Item>

        <Menu.Item key="issues" icon={<ContainerOutlined />} disabled={!isProjectSelected}>
          <NavLink to={`/dashboard/issues${location.search}`}>Issues</NavLink>
        </Menu.Item>
        
        <Menu.Item key="settings" icon={<SettingOutlined />} disabled={!isProjectSelected}>
          <NavLink to={`/dashboard/settings/general${location.search}`}>Settings</NavLink>
        </Menu.Item>

        {/* TODO: hide when not an admin */}
        <SubMenu key="admin" icon={<DashboardOutlined />} title="Admin Panel">
          <Menu.Item key="admin_users">
            <NavLink to={`/dashboard/admin/users`}>Users management</NavLink>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <LogoutModal onLogout={onLogout} />
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidemenu;