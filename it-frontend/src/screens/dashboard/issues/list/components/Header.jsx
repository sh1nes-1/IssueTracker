import 'assets/styles/IssuesList.css';
import { Layout, Row, Col, Space, Select, Skeleton } from 'antd';
import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/uk';

const { Header } = Layout;
const { Option } = Select;

// avoid collisions (value used as react key)
const PERIOD_DAYS = [7, 14, 30];
const PERIOD_MONTHS = [3, 6, 12];

function IssuesHeader({ isLoading, project, onProjectSettingsClick, onEnvironmentsChange, onDateFromChange }) {
  const onPeriodChange = value => {
    const [amount, unit] = value.split(' ');
    const dateFrom = moment().subtract(amount, unit).format('YYYY-MM-DD LTS');
    onDateFromChange(dateFrom);
  }

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
            className="environment title fullWidth borderless"
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
            className="period title gray fullWidth borderless"
            bordered={false}
            showSearch={false}
            showArrow
            onChange={onPeriodChange}
            defaultValue="14 days"
          >
            {PERIOD_DAYS.map(days => <Option key={days} value={days + ' days'}>Last {days} Days</Option>)}
            {PERIOD_MONTHS.map(months => <Option key={months} value={months + ' months'}>Last {months} Months</Option>)}
          </Select>
        </Col>
      </Row>
    </Header>
  );
}

export default IssuesHeader;