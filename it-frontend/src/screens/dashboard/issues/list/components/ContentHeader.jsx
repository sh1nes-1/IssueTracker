import React from 'react';
import { Typography, Row, Col, Select, Input } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

function IssuesContentHeader({ issuesCount, onSortBy, onSearch }) {
  return (
    <Row justify="center" align="middle">
      <Col span={7}>
        <Title className="issues-title">
          Issues&nbsp;
          {issuesCount ?
            <React.Fragment>
              <span className="sans-serif bolder">(</span>
              <span>{issuesCount}</span>
              <span className="sans-serif bolder">)</span>
            </React.Fragment> 
            : ''}
        </Title>
      </Col>
      <Col span={3}>
        <Select defaultValue="last_seen" className="sort-by-select" onChange={onSortBy} bordered={true}>
          <Option value="last_seen">
            Sort by: <Text className="bolder">Last Seen</Text>
          </Option>
          <Option value="first_seen">
            Sort by: <Text className="bolder">First Seen</Text>
          </Option>
        </Select>
      </Col>
      <Col span={14}>
        <Input.Search 
          placeholder="Search issues" 
          enterButton 
          onSearch={onSearch}
          />
      </Col>
    </Row>
  );
}

export default IssuesContentHeader;