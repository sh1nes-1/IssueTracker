import 'assets/styles/IssuesList.css';
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import IssuesHeader from './components/Header';
import IssuesTable from './components/Table';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import IssuesContentHeader from './components/ContentHeader';

const { Content } = Layout;

const data = [
  {
    key: '1',
    issue: 'John Brown',
    events: 32,
  },
  {
    key: '2',
    issue: 'Jim Green',
    events: 42,
  },
  {
    key: '3',
    issue: 'Joe Black',
    events: 32,
  },
  {
    key: '4',
    issue: 'Disabled User',
    events: 99,
  },
];

function Issues({ location }) {
  const params = queryString.parse(location.search);

  useEffect(() => {

  }, []);

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

  // TODO: remove this temp check
  if (!('project_id' in params)) {
    return <Redirect to='/dashboard/projects'/>
  }

  return (
    <Layout>
      <IssuesHeader 
        onProjectSettingsClick={showProjectSettings}
        projectTitle="robot"
        environments={[{id: 1, name: 'development'}]}
        onEnvironmentsChange={onEnvironmentsChange}
        />

      <Content className="issues-content">
        <IssuesContentHeader 
          issuesCount={123} 
          onSortBy={onSortBy} 
          onSearch={onSearch}
          />

        <IssuesTable 
          issues={data}
          loading={false}
          currentPage={params['page'] ?? 1}
          totalCount={6}
          />
      </Content>
    </Layout>
  );
}

export default Issues;