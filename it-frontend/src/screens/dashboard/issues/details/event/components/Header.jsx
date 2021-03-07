import { Button, Col, Row, Space } from 'antd';
import React from 'react';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';

function EventHeader() {
  return (
    <React.Fragment>
      <Row>
        <Col span={20}>
          <Row>
            Event Info
          </Row>        
          <Row>
            Mar 1, 2021 11:02:50 PM
          </Row>
        </Col>
        <Col span={4}>
          <div className="event-navigation availableHeight">
            <Space className="align-right">
            <Button><StepBackwardOutlined /> PREV</Button>
            <Button><StepForwardOutlined /> NEXT</Button>
            </Space>
          </div>
        </Col>
      </Row>
    </React.Fragment>    
  );
}

export default EventHeader;