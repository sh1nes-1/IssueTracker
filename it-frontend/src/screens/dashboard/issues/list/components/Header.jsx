import 'assets/styles/IssuesList.css';
import { Layout, Row, Col, Space, Select } from 'antd';
import React from 'react';
import { SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Option } = Select;

function IssuesHeader({ onProjectSettingsClick }) {
  return (
    <Header className="header">
      <Row className="d-flex" align="middle">
        <Col span={8}>
          <Space className="title accent">
            robot
            <SettingOutlined className="project-settings gray" onClick={onProjectSettingsClick} />
          </Space>
        </Col>

        <Col span={8}>
          <Select
            placeholder="All Environments"
            mode="multiple"
            className="environment title fullWidth"
            bordered={false}
            showSearch={false}
            showArrow 
          >
            <Option value="production">production</Option>
            <Option value="development">development</Option>
          </Select>         
        </Col>

        <Col span={8}>
          <Select              
            placeholder="Last 14 Days"
            className="period title gray fullWidth"
            bordered={false}
            showSearch={false}
            showArrow 
          >
            <Option value="7">Last 7 Days</Option>
            <Option value="14">Last 14 Days</Option>
          </Select>
        </Col>
      </Row>
    </Header>
  );
}

export default IssuesHeader;