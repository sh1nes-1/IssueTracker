import React from 'react';
import { Layout, Row, Col, Space, Skeleton } from 'antd';

const { Header } = Layout;

function SettingsHeader({ isLoading, project }) {
  return (
    <Header>
      <Row className="d-flex" align="middle">
        <Col span={8}>
          <Space className="title accent">
            <Skeleton className="project-title" loading={isLoading && !project} title={{ width: '150px' }} paragraph={false}>
              {project ? project.name : ''}
            </Skeleton>
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

export default SettingsHeader;