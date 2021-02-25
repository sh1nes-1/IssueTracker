import React from 'react';
import { Row } from 'antd';
import { Link } from 'react-router-dom';

function IssueItem(issue) {
  return (
    <div className="issue-item">
      <Row>
        <Link to="#" className="issue-item-exception">RedisException</Link>
      </Row>
      <Row>
        Path cannot be empty
      </Row>
      <Row>
        ROBOT-2TA
      </Row>    
    </div>    
  );
}

export default IssueItem;