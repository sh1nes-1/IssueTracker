import React from 'react';
import { Button, Space } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';

function IssueActions() {
  return (
    <React.Fragment>
      <Space style={{ marginTop: '10px' }}>
        <Button icon={<CheckOutlined />}> Resolve</Button>
        <Button icon={<StopOutlined />}> Ignore</Button>
      </Space>
    </React.Fragment>
  );
}

export default IssueActions;