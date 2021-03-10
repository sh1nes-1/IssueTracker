import React, { useEffect, useState } from "react";
import { Layout, Row, Typography } from 'antd';
import CreateUserModal from './components/CreateUser';
import { connect } from 'react-redux';
import { actions } from 'services';
import UsersTable from "./components/Table";
import { useLocation } from "react-router";
import queryString from 'query-string';
import history from '../../../../../history';
import '../../../../../assets/styles/Admin.css';

const { Title } = Typography;

function UsersManaging({ users, totalCount, isProcessing, getUsers, setSelectedUser }) {
  const location = useLocation();
  const params = queryString.parse(location.search);

  const page = parseInt(params['page'] ? params['page'].toString() : '1'); // returns NaN if not a number and cannot used with ?? operator
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (!users || users.length === 0) {
      getUsers();
    }
  }, [users, getUsers]);

  const onPageChanged = (page) => {
    history.push(`/dashboard/admin/users?page=${page}`);
    setCurrentPage(page);
  }

  const onRowClick = (user) => {
    setSelectedUser(user);
    history.push(`/dashboard/admin/users/${user.id}`);
  }

  return (
   <Layout className="pad-25">    
    <Row justify="space-between">  
      <Title>Users management</Title>
      
      <CreateUserModal />
    </Row>
    
    <UsersTable 
      currentPage={currentPage} 
      loading={isProcessing}
      onPageChanged={onPageChanged}
      totalCount={totalCount}
      users={users}
      onRowClick={onRowClick}
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
    totalCount: admin.totalCount,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(actions.AdminActions.getUsers()),
    setSelectedUser: (user) => dispatch(actions.AdminActions.setSelectedUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManaging);