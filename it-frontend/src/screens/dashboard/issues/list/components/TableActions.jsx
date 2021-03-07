import React from 'react';
import { Space, Button } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';

function TableActions(selectedKeys) {
  const canResolve = selectedKeys.length > 0;
  const canIgnore = selectedKeys.length > 0;
  const canMerge = selectedKeys.length > 1;

  return (
    <Space>
      <Button size='small' disabled={!canResolve}>
        <CheckOutlined /> Resolve
      </Button>
      <Button size='small' disabled={!canIgnore}>
        <StopOutlined /> Ignore
      </Button>
      <Button size='small' disabled={!canMerge}>
        Merge
      </Button>
    </Space>
  );
}

export default TableActions;