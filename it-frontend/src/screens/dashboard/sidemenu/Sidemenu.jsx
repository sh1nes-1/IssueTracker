import React from 'react';
import { Layout, Menu  } from 'antd';
import { FolderOutlined, ContainerOutlined, SettingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { matchRoutes } from "react-router-config";

const { Sider } = Layout;

function Sidemenu({ routes }) {
  const location = useLocation();
  const branch = matchRoutes(routes, location.pathname);
  const currentRouteKey = branch[0]?.route.key ?? "projects";

  return (
    <Sider breakpoint="lg">
      <div className="logo" />

      <Menu theme="dark" mode="inline" defaultSelectedKeys={currentRouteKey}>
        <Menu.Item key="projects" icon={<FolderOutlined />}>
          <NavLink to="/dashboard/projects">Projects</NavLink>
        </Menu.Item>

        <Menu.Item key="issues" icon={<ContainerOutlined />}>
          <NavLink to="/dashboard/issues">Issues</NavLink>
        </Menu.Item>
        
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidemenu;