import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import DetailsHeader from './components/Header';
import IssueInfo from './components/Info';

const { Content } = Layout;

function Details() {
  const showProjectSettings = () => {
    console.log('project settings');
  }

  return (
    <Layout>
      <DetailsHeader onProjectSettingsClick={showProjectSettings} />
      
      <Content className="issue-details-content">
        <IssueInfo />
        
      </Content>
    </Layout>
  );
}

export default Details;