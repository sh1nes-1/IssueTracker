import React, { useEffect } from 'react';
import { Layout } from 'antd';
import DetailsHeader from './components/Header';
import IssueInfo from './components/Info';
import IssueActions from './components/Actions';
import { renderRoutes } from "react-router-config";
import { connect } from 'react-redux';
import { actions } from 'services';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import history from '../../../../history';

const { Content } = Layout;

function Details({ route, issue, isProcessing, getIssueInfo, project, getProjectInfo }) {
  // @ts-ignore
  const { id } = useParams();
  const issue_id = id;

  const location = useLocation();
  const params = queryString.parse(location.search);
  const project_id = params['project_id'] ?? null;

  useEffect(() => {
    if (!project || project.id.toString() !== project_id) {
      getProjectInfo(project_id);
    }
  }, [project, project_id, getProjectInfo]);

  useEffect(() => {
    if (!issue || issue.id.toString() !== issue_id) {
      getIssueInfo(issue_id);
    }
  }, [issue, issue_id, getIssueInfo]);

  const showProjectSettings = () => {
    history.push(`/dashboard/settings/general?project_id=${project_id}`);
  }

  // TODO: redirect to last event if event not specified

  return (
    <Layout>
      <DetailsHeader 
        isLoading={!project}
        project={project}
        onProjectSettingsClick={showProjectSettings}           
        />
      
      <Content className="issue-details-content">
        <IssueInfo issue={issue} isLoading={isProcessing} />
        <IssueActions />

        {renderRoutes(route.routes)}
      </Content>
    </Layout>
  );
}



function mapStateToProps({ issues, projects }) {
  return {
    isProcessing: issues.isProcessingIssue,
    isErrorIssue: issues.isErrorIssue,
    issue: issues.issue,

    project: projects.project,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getIssueInfo: (issue_id) => dispatch(actions.IssuesActions.getIssueInfo(issue_id)),
    getProjectInfo: (project_id) => dispatch(actions.ProjectActions.getProjectInfo(project_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);