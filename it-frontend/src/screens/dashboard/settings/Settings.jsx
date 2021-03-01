import 'assets/styles/Settings.css';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { Layout } from 'antd';
import SettingsHeader from './components/Header';
import { renderRoutes } from 'react-router-config';
import SettingsSubmenu from './components/Submenu';
import { connect } from 'react-redux';
import { actions } from 'services';

const { Content } = Layout;

function Settings({ route, location, getProjectInfo, isProcessingProject, project }) {
  const params = queryString.parse(location.search);
  const project_id = params['project_id'] ?? null;

  useEffect(() => {
    if (!project || project.id.toString() !== project_id) {
      getProjectInfo(project_id);
    }
  }, [project, project_id, getProjectInfo]);

  if (!project_id) {
    return <Redirect to='/dashboard/projects'/>
  }

  return (
    <Layout>
      <SettingsHeader
        isLoading={isProcessingProject}
        project={project}
        />
        
      <Content className="availableHeight">
        <Layout>
          <SettingsSubmenu
            location={location}
            routes={route.routes}
            />

          <Content className="settings-content">
            {renderRoutes(route.routes)}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

function mapStateToProps({ projects }) {
  return {
    isProcessingProject: projects.isProcessingProject,
    isErrorProject: projects.isErrorProject,
    project: projects.project,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProjectInfo: (project_id) => dispatch(actions.ProjectActions.getProjectInfo(project_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);