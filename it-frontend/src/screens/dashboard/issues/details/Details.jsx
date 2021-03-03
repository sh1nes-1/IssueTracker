import React from 'react';
import { Layout } from 'antd';
import DetailsHeader from './components/Header';
import IssueInfo from './components/Info';
import IssueActions from './components/Actions';
import { renderRoutes } from "react-router-config";

const { Content } = Layout;

function Details({ route }) {
  const showProjectSettings = () => {
    console.log('project settings');
  }

  // TODO: redirect to last event if event not specified

  return (
    <Layout>
      <DetailsHeader onProjectSettingsClick={showProjectSettings} />
      
      <Content className="issue-details-content">
        <IssueInfo />
        <IssueActions />

        {renderRoutes(route.routes)}
      </Content>
    </Layout>
  );
}

export default Details;