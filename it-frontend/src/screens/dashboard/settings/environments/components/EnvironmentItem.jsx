import React from 'react';
import { List } from 'antd';
import history from '../../../../../history';
import { useLocation } from 'react-router-dom'

function EnvironmentItem(item) {
  const location = useLocation()

  const onClick = () => {
    history.push(`/dashboard/settings/environments/${item.id}${location.search}`);
  }

  return (
    <List.Item 
      className="environment-list-item" 
      key={item.id} 
      onClick={onClick}
    >
      {item.name}
    </List.Item>
  );
}

export default EnvironmentItem;