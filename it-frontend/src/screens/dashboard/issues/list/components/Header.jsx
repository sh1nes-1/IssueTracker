import 'assets/styles/IssuesList.css';
import { Layout, Row, Col, Space, Select, Skeleton } from 'antd';
import React from 'react';
import { SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Option } = Select;

function IssuesHeader({ isLoading, project, onProjectSettingsClick, onEnvironmentsChange }) {
  return (
    <Header className="header">
      <Row className="d-flex" align="middle">
        <Col span={8}>        
          <Space className="title accent">            
            <Skeleton className="project-title" loading={isLoading} title={{ width: '150px' }} paragraph={false}>
              {project ? project.name : ''}
            </Skeleton>
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
            onChange={onEnvironmentsChange}
          >
            {project ? 
              project.environments.map(env => <Option key={env.id} value={env.id}>{env.name}</Option>)
              : ''}
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