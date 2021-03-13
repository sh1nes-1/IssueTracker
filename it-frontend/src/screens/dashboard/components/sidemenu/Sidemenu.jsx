import React from 'react';
import {  Avatar, Layout, Menu, Space, Typography  } from 'antd';
import { FolderOutlined, ContainerOutlined, SettingOutlined, LogoutOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { matchRoutes } from "react-router-config";
import queryString from 'query-string';
import LogoutModal from './LogoutModal';
import { logout } from 'services/startup';
import SubMenu from 'antd/lib/menu/SubMenu';
import { connect } from 'react-redux';
import { capitalize } from 'utils';
import { actions } from 'services';

const { Sider } = Layout;
const { Text } = Typography;

function Sidemenu({ routes, user, user_role, setProjectsLocal }) {
  const location = useLocation();
  const branch = matchRoutes(routes, location.pathname);
  const currentRouteKey = branch[branch.length - 1]?.route?.key?.toString() ?? "";
  const params = queryString.parse(location.search);
  const isProjectSelected = 'project_id' in params;
  const isAdminRoute = currentRouteKey.includes('admin');

  const onLogout = () => {
    setProjectsLocal([]);
    logout();
  }

  return (
    <Sider breakpoint="lg">
      <div className="logo">
        <Space>
          <Avatar size="default" icon={<UserOutlined />} style={{ backgroundColor: '#a5afcc' }} />
          <div className="logo-text">
            <Text style={{ color: 'white', fontSize: '14px' }}>{user?.name ?? ' '}</Text>
            <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '14px'}}>{capitalize(user_role)}</div>
          </div>
        </Space>
      </div>

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
        
        {user_role === 'admin' &&
          <SubMenu key="admin" icon={<DashboardOutlined />} title="Admin Panel">
            <Menu.Item key="admin_users">
              <NavLink to={`/dashboard/admin/users`}>Users management</NavLink>
            </Menu.Item>
          </SubMenu>
        }

        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <LogoutModal onLogout={onLogout} />
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

function mapStateToProps({ app }) {
  return {
    user: app.user,
    user_role: app.role,    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setProjectsLocal: (projects) => dispatch(actions.ProjectActions.setProjectsLocal(projects)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidemenu);