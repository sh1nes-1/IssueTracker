import React from 'react';
import { Row, Col, Typography, Badge, Space, Skeleton } from 'antd';

const { Title } = Typography;

function IssueInfo({ issue, isLoading }) {
  return (
    <Row>
      <Col span={18}>
        <div className="issue-details-info">
          <Space>
            <Title className="issue-details-title">
              <Skeleton loading={isLoading} title={{ width: '150px' }} paragraph={false}>
                {issue?.exception_name ?? ''}
              </Skeleton>
            </Title>

            <Title className="issue-details-path">
              <Skeleton loading={isLoading} title={{ width: '400px' }} paragraph={false}>
                {issue?.filename ?? ''}
              </Skeleton>
            </Title>
          </Space>
        </div>

        <Badge
          dot={true} 
          status='error'
          text={isLoading ? 'Loading...' : issue?.message}
          />
      </Col>

      <Col span={6}>
        <Row justify='space-between' className="align-right"> 
          <Col span={16}>
            <h4 className="header-param-title light-gray">ISSUE #</h4>
            <span className="header-param">{issue?.short_id ?? 'LOADING...'}</span>
          </Col>
          <Col span={8}>
            <h4 className="header-param-title light-gray">Events</h4>            
            <span className="header-param">{issue?.events ?? 0}</span>            
          </Col>
        </Row>       
      </Col>
    </Row>
  );
}

export default IssueInfo;