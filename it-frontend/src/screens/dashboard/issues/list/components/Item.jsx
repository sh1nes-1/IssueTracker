import React from 'react';
import { Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/en-gb';

function IssueItem(issue) {
  const first_seen = moment(issue.first_seen).locale('en').fromNow();
  const last_seen = moment(issue.last_seen).locale('en').fromNow().replace('ago', 'old');

  return (
    <div className="issue-item" key={issue.id}>
      <Row className="issue-item-header">
        <Link to="/dashboard/issues/1" className="issue-item-exception gray">
          <span className="issue-exception-title">
            {issue.exception_name}
          </span>
          <span className="issue-class-path light-gray">
            {issue.filename}
          </span>
        </Link>     
      </Row>
      <Row className="issue-exception-message">      
        {issue.message}
      </Row>
      <Row className="issue-parameters gray d-flex" align="middle">
        <Col>
          <Space align="center" size='middle'>
            <span>{issue.short_id}</span>
            <span><ClockCircleOutlined /> {first_seen} - {last_seen}</span>
            <span>{issue.programming_language}</span>
          </Space>
        </Col>
      </Row>
    </div>    
  );
}

export default IssueItem;