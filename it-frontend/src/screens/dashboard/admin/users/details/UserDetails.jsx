import { Layout, PageHeader, Spin } from "antd";
import React, { useEffect } from "react";
import history from '../../../../../history';
import { connect } from 'react-redux';
import { actions } from 'services';
import { useParams } from "react-router-dom";
import EditUser from "./components/EditUser";
import { Content } from "antd/lib/layout/layout";

function UserDetails({ user, getUserInfo }) {
  // @ts-ignore
  const { id } = useParams();

  const onBack = () => {
    history.push('/dashboard/admin/users/');
  }

  useEffect(() => {
    if (!user) {
      getUserInfo(id);
    }
  });

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={onBack}
        title="User details"
        ghost={false}
      />

      <Content className="pad-25 user-details-content">
        {user ? 
          <EditUser user={user} /> : 
          <div className="spin-block">
            <Spin size="large" className="spin" />
          </div>
        }
        
      </Content>
    </Layout>
  );
}


function mapStateToProps({ admin }) {
  return {
    user: admin.selectedUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // @ts-ignore
    getUserInfo: (id) => dispatch(actions.AdminActions.getUserInfo(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);