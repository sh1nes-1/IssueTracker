import 'assets/styles/Settings.css';
import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { Layout } from 'antd';
import SettingsHeader from './components/Header';
import { renderRoutes } from 'react-router-config';
import SettingsSubmenu from './components/Submenu';

const { Content } = Layout;

function Settings({ route, location }) {
  const params = queryString.parse(location.search);
  const project_id = params['project_id'] ?? null;

  if (!project_id) {
    return <Redirect to='/dashboard/projects'/>
  }

  return (
    <Layout>
      <SettingsHeader />
      <Content className="availableHeight">
        <Layout>
          <SettingsSubmenu
            location={location}
            routes={route.routes}
            />

          <Content className="settings-content">
            {renderRoutes(route.routes)}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default Settings;