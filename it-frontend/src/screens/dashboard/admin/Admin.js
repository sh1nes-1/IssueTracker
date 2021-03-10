import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { renderRoutes } from "react-router-config";


function Admin({ route, user_role }) {
  if (user_role !== 'admin') {
    return <Redirect to='/dashboard/' />
  }

  return renderRoutes(route.routes);
}


function mapStateToProps({ app }) {
  return {
    user_role: app.role,
  }
}

export default connect(mapStateToProps)(Admin);