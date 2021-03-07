import { Button, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import history from '../../../../../../history';
import moment from 'moment';
import 'moment/locale/en-gb';

const { Title } = Typography;

function EventHeader({ issue, isLoading }) {
  const onPrevClick = () => {
    history.push(`/dashboard/issues/${issue.id}/events/${issue.prev_event_id}?project_id=${issue.project_id}`);
  }

  const onNextClick = () => {
    history.push(`/dashboard/issues/${issue.id}/events/${issue.next_event_id}?project_id=${issue.project_id}`);
  }

  return (
    <React.Fragment>
      <Row>
        <Col span={20}>
          <Row>
            <Title>
              Event #{issue?.event?.id}
            </Title>
          </Row>        
          <Row>
            {moment(issue?.event?.created_at).locale('en').format('MMMM Do YYYY, h:mm:ss a')}
          </Row>
        </Col>
        <Col span={4}>
          <div className="event-navigation availableHeight">
            <Space className="align-right">
              <Button disabled={!issue?.prev_event_id || isLoading} onClick={onPrevClick}>
                <StepBackwardOutlined /> PREV
              </Button>
              <Button disabled={!issue?.next_event_id || isLoading} onClick={onNextClick}>
                <StepForwardOutlined /> NEXT
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </React.Fragment>    
  );
}

export default EventHeader;