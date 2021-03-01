import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { matchRoutes } from 'react-router-config';

const { Sider } = Layout;

function SettingsSubmenu({ location, routes }) {
  const branch = matchRoutes(routes, location.pathname);
  const currentRouteKey = branch[0]?.route?.subkey?.toString() ?? "";

  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        selectedKeys={[currentRouteKey]}
        style={{ height: '100%' }}
      >
        <Menu.Item key="general">
          <NavLink to={`/dashboard/settings/general${location.search}`}>General</NavLink>
        </Menu.Item>
        <Menu.Item key="environments">
          <NavLink to={`/dashboard/settings/environments${location.search}`}>Environments</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SettingsSubmenu;