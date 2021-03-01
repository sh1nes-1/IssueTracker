import React from 'react';
import { Typography, Row, List } from 'antd';
import CreateEnvironmentModal from './components/CreateEnvironment';
import EnvironmentItem from './components/EnvironmentItem';
import { connect } from 'react-redux';
import { actions } from 'services';

const { Title } = Typography;

function Environments({ isProcessingProject, project }) {
  return (
    <React.Fragment>
      <Row justify="space-between">  
        <Title className="settings-title">
          Environments
        </Title>

        <CreateEnvironmentModal />
      </Row>

      <List
       loading={isProcessingProject}
       bordered 
       dataSource={project?.environments} 
       rowKey="id" 
       renderItem={EnvironmentItem}
       className="environments-list"
      >
        
      </List>
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

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Environments);