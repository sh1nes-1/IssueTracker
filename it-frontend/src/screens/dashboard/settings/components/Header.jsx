import React from 'react';
import { Layout, Row, Col, Space } from 'antd';

const { Header } = Layout;

function SettingsHeader() {
  return (
    <Header>
      <Row className="d-flex" align="middle">
        <Col span={8}>
          <Space className="title accent">
            robot
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

export default SettingsHeader;