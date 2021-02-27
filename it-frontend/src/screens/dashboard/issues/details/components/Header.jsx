import 'assets/styles/IssueDetails.css';
import React from 'react';
import { Layout, Row, Col, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;

function DetailsHeader({ onProjectSettingsClick }) {
  return (
    <Header>
      <Row className="d-flex" align="middle">
        <Col span={8}>
          <Space className="title accent">
            robot
            <SettingOutlined className="project-settings gray" onClick={onProjectSettingsClick} />
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

export default DetailsHeader;