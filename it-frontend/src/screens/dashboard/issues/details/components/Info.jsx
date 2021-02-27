import React from 'react';
import { Row, Col, Typography, Badge, Space } from 'antd';

const { Title } = Typography;

function IssueInfo() {
  return (
    <Row>
      <Col span={20}>
        <div className="issue-details-info">
          <Space>
            <Title className="issue-details-title">
              GuzzleHttp\Exception\ServerException
            </Title>

            <Title className="issue-details-path">
              /app/Models/Robots/Rides/monitor/Actions/MonitorRide.php in App\Models\Robots\Rides\monitor\Actions\MonitorRide::monitor
            </Title>
          </Space>
        </div>

        <Badge
          dot={true} 
          status='error'
          text='Server error: `GET https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin=36.11155821887'
          />
      </Col>

      <Col span={4}>
        <Row justify='space-between' className="align-right"> 
          <Col span={12}>
            <h4 className="header-param-title light-gray">ISSUE #</h4>
            <span className="header-param">ROBOT-2TQ</span>
          </Col>
          <Col span={12}>
            <h4 className="header-param-title light-gray">Events</h4>
            <span className="header-param">14</span>
          </Col>
        </Row>       
      </Col>
    </Row>
  );
}

export default IssueInfo;