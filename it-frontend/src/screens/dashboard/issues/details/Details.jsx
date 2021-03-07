import React, { useEffect } from 'react';
import { Layout, Spin } from 'antd';
import DetailsHeader from './components/Header';
import IssueInfo from './components/Info';
import IssueActions from './components/Actions';
import { matchRoutes, renderRoutes } from "react-router-config";
import { connect } from 'react-redux';
import { actions } from 'services';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import history from '../../../../history';

const { Content, Footer } = Layout;

function Details({ route, issue, getIssueInfo, project, getProjectInfo }) {
  // @ts-ignore
  const { id } = useParams();
  const issue_id = id;

  const location = useLocation();
  const params = queryString.parse(location.search);
  const project_id = params['project_id'] ?? null;

  const branch = matchRoutes(route.routes, location.pathname);
  const currentRouteKey = branch[0]?.route?.subkey?.toString() ?? null; // 'event' or null
  const event_id = branch[0]?.match?.params?.eventId ?? undefined;

  const isIssueLoaded = issue && issue.id.toString() === issue_id ; // eslint-disable-next-line eqeqeq  
  const isEventLoaded = isIssueLoaded && issue.event.id == event_id; 


  console.log(`Event ID: ${JSON.stringify(event_id)}`);

  useEffect(() => {
    if (!project || project.id.toString() !== project_id) {
      getProjectInfo(project_id);
    }
  }, [project, project_id, getProjectInfo]);

  useEffect(() => {
    if (!isIssueLoaded || (currentRouteKey && !isEventLoaded)) {
      getIssueInfo(issue_id, event_id);
    }
  }, [issue, issue_id, getIssueInfo, event_id, isEventLoaded, isIssueLoaded, currentRouteKey]);

  if (!project_id) {
    return <Redirect to='/dashboard/projects'/>
  }

  if (!currentRouteKey && isIssueLoaded) {
    console.log('Redirect');
    return <Redirect to={`/dashboard/issues/${issue_id}/events/${issue.event.id}?project_id=${project_id}`} />
  }

  const showProjectSettings = () => {
    history.push(`/dashboard/settings/general?project_id=${project_id}`);
  }

  return (
    <Layout>
      <DetailsHeader 
        isLoading={!project}
        project={project}
        onProjectSettingsClick={showProjectSettings}           
        />
      
      <Content className="issue-details-content">
        <IssueInfo issue={issue} isLoading={!isIssueLoaded} />
        <IssueActions isLoadingIssue={!isIssueLoaded} issue={issue} />

        {currentRouteKey && isIssueLoaded ? 
          renderRoutes(route.routes) :           
          <div className="spin-block">
            <Spin size="large" className="spin" />
          </div>
          }
      </Content>

      <Footer className="details-footer">      
        Sh1ne &copy; {new Date().getFullYear()}
      </Footer>
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
    getIssueInfo: (issue_id, event_id) => dispatch(actions.IssuesActions.getIssueInfo(issue_id, event_id)),
    getProjectInfo: (project_id) => dispatch(actions.ProjectActions.getProjectInfo(project_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);