import React from 'react';
import { Typography, Row, List } from 'antd';
import CreateEnvironmentModal from './components/CreateEnvironment';
import EnvironmentItem from './components/EnvironmentItem';
import { connect } from 'react-redux';

const { Title } = Typography;

function Environments({ isProcessingProject, project }) {
  return (
    <React.Fragment>
      <Row justify="space-between">  
        <Title className="settings-title">
          Environments
        </Title>

        <CreateEnvironmentModal project_id={project?.id} />
      </Row>

      <List
       loading={isProcessingProject}
       bordered 
       dataSource={project?.environments} 
       rowKey="id" 
       renderItem={EnvironmentItem}
       className="my-list"
       />
    </React.Fragment>
  );
}

function mapStateToProps({ projects }) {
  return {
    isProcessingProject: projects.isProcessingProject,
    isErrorProject: projects.isErrorProject,
    project: projects.project,
  }
}


export default connect(mapStateToProps)(Environments);