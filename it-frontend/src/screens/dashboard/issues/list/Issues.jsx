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

  const page = parseInt(params['page'] ? params['page'].toString() : '1'); // returns NaN if not a number and cannot used with ?? operator
  const [currentPage, setCurrentPage] = useState(page);
  const [sortBy, setSortBy] = useState('last_seen');
  const [status, setStatus] = useState('unresolved');
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
        environments_ids: environments.join(','),
        is_resolved: status === 'all' ? '' : status === 'resolved',
        is_ignored: false,
      });
    }
  }, [project_id, getIssues, sortBy, search, currentPage, dateFrom, environments, status]);

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

  // need to filter because resolve just setting status of issue locally
  const filtered_issues = issues
    .filter(issue => !issue.is_ignored)
    .filter(issue => status === 'unresolved' ? !issue.is_resolved : true);

  const onPageChanged = (page) => {
    history.push(`/dashboard/issues?project_id=${project_id}&page=${page}`);
    setCurrentPage(page);
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
          onSelectStatus={value => setStatus(value)}
          />

        <IssuesTable 
          project_id={project_id}
          issues={filtered_issues}
          loading={isProcessingIssues}
          currentPage={currentPage}
          totalCount={totalIssuesCount}
          onPageChanged={onPageChanged}
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