import React from "react";
import { Layout, Row, Typography } from 'antd';
import CreateUserModal from './components/CreateUser';

const { Title } = Typography;

function UsersManaging() {
  return (
   <Layout className="pad-25">    
    <Row justify="space-between">  
      <Title>Users management</Title>
      
      <CreateUserModal />
    </Row>
    
    </Layout>
  );
}

export default UsersManaging;