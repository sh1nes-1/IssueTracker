import 'assets/styles/IssuesList.css';
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import IssuesHeader from './components/Header';
import IssuesTable from './components/Table';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import IssuesContentHeader from './components/ContentHeader';
import { connect } from 'react-redux';
import { actions } from 'services';

const { Content } = Layout;

function Issues({ location, project, issues, totalIssuesCount, getProjectInfo, getIssues, isProcessingProject, isProcessingIssues }) {
  const params = queryString.parse(location.search);
  const project_id = params['project_id'] ?? null;

  const [currentPage, setCurrentPage] = useState(params['page'] ?? 1);

  useEffect(() => {
    if (project_id) {
      getIssues(project_id);
    }
  }, [project_id, getIssues]);

  useEffect(() => {
    if (!project || project.id.toString() !== project_id) {
      getProjectInfo(project_id);
    }
  }, [project, project_id, getProjectInfo]);

  const showProjectSettings = () => {
    console.log('project settings');
  }

  const onEnvironmentsChange = env_ids => {
    console.log(env_ids);
  }

  const onSortBy = value => {
    console.log(`sort by: ${value}`)
  }

  const onSearch = value => {
    console.log(`search: ${value}`);
  }

  const onPageChanged = page => {
    setCurrentPage(page);
    console.log(`page: ${page}`);
  }

  // TODO: remove this temp check
  if (!project_id) {
    return <Redirect to='/dashboard/projects'/>
  }

  return (
    <Layout>
      <IssuesHeader 
        onProjectSettingsClick={showProjectSettings}
        isLoading={isProcessingProject}
        project={project}
        onEnvironmentsChange={onEnvironmentsChange}
        />

      <Content className="issues-content">
        <IssuesContentHeader 
          issuesCount={totalIssuesCount} 
          onSortBy={onSortBy} 
          onSearch={onSearch}
          />

        <IssuesTable 
          issues={issues}
          loading={isProcessingIssues}
          currentPage={currentPage}
          totalCount={totalIssuesCount}
          onPageChanged={onPageChanged}
          />
      </Content>
    </Layout>
  );
}


function mapStateToProps({ issues }) {
  return {
    isProcessingProject: issues.isProcessingProject,
    isErrorProject: issues.isErrorProject,
    project: issues.project,

    isProcessingIssues: issues.isProcessingIssues,
    isErrorIssues: issues.isErrorIssues,
    issues: issues.issues,
    totalIssuesCount: issues.totalIssuesCount,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProjectInfo: (project_id) => dispatch(actions.IssuesActions.getProjectInfo(project_id)),
    getIssues: (project_id) => dispatch(actions.IssuesActions.getIssues(project_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Issues);