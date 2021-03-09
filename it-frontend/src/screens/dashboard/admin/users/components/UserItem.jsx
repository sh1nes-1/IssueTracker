import React from 'react';
import { List, Row } from 'antd';
import history from '../../../../../history';
import { setSelectedUser } from 'services/dashboard/admin/actions';

function EnvironmentItem(item) {
  const onClick = () => {
    setSelectedUser(item);
    history.push(`/dashboard/admin/users/${item.id}`);
  }

  return (
    <List.Item 
      className="pointer-list-item" 
      key={item.id} 
      onClick={onClick}
    >
      <Row>
        {item.name}
      </Row>
    </List.Item>
  );
}

export default EnvironmentItem;