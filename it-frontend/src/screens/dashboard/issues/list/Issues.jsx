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
import moment from 'moment';
import 'moment/locale/uk';
import history from '../../../../history';

const { Content } = Layout;

function Issues({ location, project, issues, totalIssuesCount, getProjectInfo, getIssues, isProcessingProject, isProcessingIssues }) {
  const params = queryString.parse(location.search);
  const project_id = params['project_id'] ?? null;

  const [currentPage, setCurrentPage] = useState(params['page'] ?? 1);
  const [sortBy, setSortBy] = useState('last_seen');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState(moment().subtract(14, 'days').format('YYYY-MM-DD LTS'));
  const [environments, setEnvironments] = useState([]);

  useEffect(() => {
    if (project_id) {
      getIssues({ 
        project_id: project_id, 
        sort_by: sortBy, 
        search: search, 
        page: currentPage, 
        date_from: dateFrom,
        environments_ids: environments.join(',')
      });
    }
  }, [project_id, getIssues, sortBy, search, currentPage, dateFrom, environments]);

  useEffect(() => {
    if (!project || project.id.toString() !== project_id) {
      getProjectInfo(project_id);
    }
  }, [project, project_id, getProjectInfo]);

  const showProjectSettings = () => {
    history.push(`/dashboard/settings/general?project_id=${project_id}`);
  }

  if (!project_id) {
    return <Redirect to='/dashboard/projects'/>
  }

  return (
    <Layout>
      <IssuesHeader 
        onProjectSettingsClick={showProjectSettings}
        isLoading={isProcessingProject}
        project={project}
        onEnvironmentsChange={values => setEnvironments(values)}
        onDateFromChange={value => setDateFrom(value)}
        />

      <Content className="issues-content">
        <IssuesContentHeader 
          issuesCount={totalIssuesCount} 
          onSortBy={value => setSortBy(value)} 
          onSearch={value => setSearch(value)}
          />

        <IssuesTable 
          project_id={project_id}
          issues={issues}
          loading={isProcessingIssues}
          currentPage={currentPage}
          totalCount={totalIssuesCount}
          onPageChanged={page => setCurrentPage(page)}
          />
      </Content>
    </Layout>
  );
}


function mapStateToProps({ issues, projects }) {
  return {
    isProcessingProject: projects.isProcessingProject,
    isErrorProject: projects.isErrorProject,
    project: projects.project,

    isProcessingIssues: issues.isProcessingIssues,
    isErrorIssues: issues.isErrorIssues,
    issues: issues.issues,
    totalIssuesCount: issues.totalIssuesCount,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProjectInfo: (project_id) => dispatch(actions.ProjectActions.getProjectInfo(project_id)),
    getIssues: (options) => dispatch(actions.IssuesActions.getIssues(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Issues);