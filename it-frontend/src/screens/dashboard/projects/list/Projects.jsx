import React, { useEffect, useState } from 'react';
import { Typography, Layout, Row, Col, Card, Avatar, Skeleton, Empty  } from 'antd';
import { Link } from 'react-router-dom';
import CreateProjectModal from '../create/CreateProject';
import { connect } from 'react-redux';
import { actions } from 'services';
import moment from 'moment';
import 'moment/locale/en-gb'

const { Title } = Typography;
const { Meta } = Card;

const loadingProject = {
  id: 0,
  name: 'Loading...',
  loading: true,
  created_at: ''
};

const PROJECTS_UPDATE_INTERVAL = 30000;

function Projects({ getProjects, isProcessing, projects }) {
  useEffect(() => {
    if (!(projects?.length > 0)) { 
      getProjects();
    }

    const interval = setInterval(() => getProjects(), PROJECTS_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const hasProjects = projects?.length > 0;

  return (
    <Layout className="pad-25">
      <Row justify="space-between">  
        <Title>Projects</Title>

        <CreateProjectModal />
      </Row>
      
      {hasProjects ? 
          <Row gutter={[16, 16]}>
            {projects.map(mapProject)}
          </Row> : 

          isProcessing ?

            <Row gutter={[16, 16]}>
              {mapProject(loadingProject)}
            </Row> :

            <Row justify="center" align="middle" className="availableHeight">
              <Empty />
            </Row>
      }
     
    </Layout>
  );
}

function mapProject(project) {
  return (
    <Col key={project.id} span={6}>
      <Link to={`/dashboard/issues/?project_id=${project.id}`}>
        <Card size="small" hoverable={true}>
          <Skeleton loading={project?.loading} avatar active paragraph={{ rows: 1 }}>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={project.name}
              description={`Created ${moment(project.created_at).format('L LTS')}`}
            />            
          </Skeleton>
        </Card>
      </Link>
    </Col>
  );
}

function mapStateToProps({ projects }) {
  return {
    isProcessing: projects.isProcessingGet,
    projects: projects.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProjects: () => dispatch(actions.ProjectActions.getProjects()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);