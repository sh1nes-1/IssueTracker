import React from 'react';
import {  Layout, Menu  } from 'antd';
import { FolderOutlined, ContainerOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { matchRoutes } from "react-router-config";
import queryString from 'query-string';
import LogoutModal from './LogoutModal';
import { logout } from 'services/startup';

const { Sider } = Layout;

function Sidemenu({ routes }) {
  const location = useLocation();
  const branch = matchRoutes(routes, location.pathname);
  const currentRouteKey = branch[0]?.route?.key?.toString() ?? "";
  const params = queryString.parse(location.search);
  const isProjectSelected = 'project_id' in params;

  const onLogout = () => {
    logout();
  }

  return (
    <Sider breakpoint="lg">
      <div className="logo" />

      <Menu theme="dark" mode="inline" selectedKeys={[currentRouteKey]}>
        <Menu.Item key="projects" icon={<FolderOutlined />}>
          <NavLink to={`/dashboard/projects${location.search}`}>Projects</NavLink>
        </Menu.Item>

        <Menu.Item key="issues" icon={<ContainerOutlined />} disabled={!isProjectSelected}>
          <NavLink to={`/dashboard/issues${location.search}`}>Issues</NavLink>
        </Menu.Item>
        
        <Menu.Item key="settings" icon={<SettingOutlined />} disabled={!isProjectSelected}>
          <NavLink to={`/dashboard/settings/general${location.search}`}>Settings</NavLink>
        </Menu.Item>

        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <LogoutModal onLogout={onLogout} />
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidemenu;