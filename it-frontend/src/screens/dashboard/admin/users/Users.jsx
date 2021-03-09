import React, { useEffect } from "react";
import { Layout, List, Row, Typography } from 'antd';
import CreateUserModal from './components/CreateUser';
import { connect } from 'react-redux';
import { actions } from 'services';
import UserItem from "./components/UserItem";

const { Title } = Typography;

function UsersManaging({ users, isProcessing, isSuccess, isError, getUsers }) {

  useEffect(() => {
    if (!users || users.length === 0) {
      getUsers();
    }
  }, [users, getUsers]);

  return (
   <Layout className="pad-25">    
    <Row justify="space-between">  
      <Title>Users management</Title>
      
      <CreateUserModal />
    </Row>
    
    {/* TODO: Change to Table with pagination */}
    <List
       loading={isProcessing}
       bordered 
       dataSource={users} 
       rowKey="id" 
       renderItem={UserItem}
       className="my-list"
       />
    </Layout>
  );
}

function mapStateToProps({ admin }) {
  return {
    isProcessing: admin.isProcessingGetUsers,
    isSuccess: admin.isSuccessGetUsers,
    isError: admin.isErrorGetUsers,
    users: admin.users,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(actions.AdminActions.getUsers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManaging);