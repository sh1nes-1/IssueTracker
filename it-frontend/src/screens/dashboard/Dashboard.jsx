import "../../assets/styles/Dashboard.css";
import React from 'react';
import { Layout  } from 'antd';
import Sidemenu from './components/sidemenu/Sidemenu';
import { renderRoutes } from "react-router-config";

function Dashboard({ route }) {
  return (
    <Layout className="fullHeight">
      <Sidemenu routes={route.routes} />

      {renderRoutes(route.routes)}
    </Layout>
  );
}

export default Dashboard;