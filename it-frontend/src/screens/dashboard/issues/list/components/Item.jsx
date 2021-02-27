import React from 'react';
import { Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';

function IssueItem(issue) {
  return (
    <div className="issue-item">
      <Row className="issue-item-header">
        <Link to="/dashboard/issues/1" className="issue-item-exception gray">
          <span className="issue-exception-title">
            RedisException
          </span>
          <span className="issue-class-path">
            /app/Models/Robots/Documents/validate/Jobs/ValidateDocument.php in App\Models\Robots\Documents\validate\Jobs\ValidateDocument::performTask
          </span>
        </Link>     
      </Row>
      <Row className="issue-exception-message">      
        Path cannot be empty Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magni illum repudiandae? Accusantium tenetur labore ipsum illo tempora ullam culpa vitae quas autem quod error porro dolorem est, dolore voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum pariatur saepe laudantium quas voluptate totam error placeat ipsum assumenda cupiditate. Excepturi reiciendis ad magnam debitis quibusdam. Commodi aliquid veniam nobis!
      </Row>
      <Row className="issue-parameters gray d-flex" align="middle">
        <Col>
          <Space align="center" size='middle'>
            <span>ROBOT-2TA</span>
            <span><ClockCircleOutlined /> 29.01.2020 16:53 - 30.03.2020 17:56</span>
            <span>php</span>
          </Space>
        </Col>
      </Row>
    </div>    
  );
}

export default IssueItem;