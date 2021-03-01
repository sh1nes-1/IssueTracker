import React from 'react';
import { Typography, Row, List } from 'antd';
import CreateEnvironmentModal from './components/CreateEnvironment';
import EnvironmentItem from './components/EnvironmentItem';

const { Title } = Typography;

const environments = [
  { id: 1, name: 'development' },
  { id: 2, name: 'release' },
];

function Environments() {
  return (
    <React.Fragment>
      <Row justify="space-between">  
        <Title className="settings-title">
          Environments
        </Title>

        <CreateEnvironmentModal />
      </Row>

      <List
       bordered 
       dataSource={environments} 
       rowKey="id" 
       renderItem={EnvironmentItem}
       className="environments-list"
      >
        
      </List>
    </React.Fragment>
  );
}

export default Environments;