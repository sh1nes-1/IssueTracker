import 'assets/styles/Issues.css';
import React from 'react';
import { Layout, Typography, Row, Col, Select, Input } from 'antd';
import IssuesHeader from './components/IssuesHeader';
import IssuesTable from './components/IssuesTable';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

function Issues() {
  const showProjectSettings = () => {
    console.log('project settings');
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <Layout>
      <IssuesHeader onProjectSettingsClick={showProjectSettings} />

      <Content className="issues-content">
        <Row justify="center" align="middle">
          <Col span={7}>
            <Title className="issues-title">
              Issues&nbsp;
              <span className="sans-serif bolder">(</span>
              <span>123</span>
              <span className="sans-serif bolder">)</span>
            </Title>
          </Col>
          <Col span={3}>
            <Select defaultValue="last_seen" className="sort-by-select" onChange={handleChange} bordered={true}>
              <Option value="last_seen">
                Sort by: <Text className="bolder">Last Seen</Text>
              </Option>
              <Option value="first_seen">
                Sort by: <Text className="bolder">First Seen</Text>
              </Option>
            </Select>
          </Col>
          <Col span={14}>
            <Input.Search placeholder="Search issues" enterButton />
          </Col>
        </Row>
        
        <IssuesTable />
      </Content>
    </Layout>
  );
}

export default Issues;