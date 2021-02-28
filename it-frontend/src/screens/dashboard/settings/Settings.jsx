import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

function Settings({ location }) {
  const params = queryString.parse(location.search);
  const project_id = params['project_id'] ?? null;

  if (!project_id) {
    return <Redirect to='/dashboard/projects'/>
  }

  return (
    <div>
      Settings
    </div>
  );
}

export default Settings;