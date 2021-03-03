import 'assets/styles/IssueDetails.css';
import React from 'react';
import { Layout, Row, Col, Space, Skeleton } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;

function DetailsHeader({ isLoading, project, onProjectSettingsClick }) {
  return (
    <Header>
      <Row className="d-flex" align="middle">
        <Col span={8}>
          <Space className="title accent">
            <Skeleton className="project-title" loading={isLoading && !project} title={{ width: '150px' }} paragraph={false}>
              {project ? project.name : ''}
            </Skeleton>
            
            <SettingOutlined className="project-settings gray" onClick={onProjectSettingsClick} />
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

export default DetailsHeader;