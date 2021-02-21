import React from 'react';
import { Typography, Layout, Row, Col, Card, Avatar, Skeleton, Button  } from 'antd';
import { Link } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Meta } = Card;

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Experts",
      created_at: "22.01.2020"
    },
    {
      id: 2,
      title: "Mojave",
      created_at: "27.05.2020"
    },    
  ];

  return (
    <Layout className="pad-25">
      <Row justify="space-between">  
        <Title>Projects</Title>

        <Link to="/dashboard/projects/create">
          <Button>
            <PlusCircleOutlined /> Create Project
          </Button>
        </Link>
      </Row>

      <Row gutter={[16, 16]}>
        {projects.map(mapProject)}
      </Row>
    </Layout>
  );
}

function mapProject(project) {
  return (
    <Col key={project.id} span={6}>
      <Link to={`/dashboard/issues/?project_id=${project.id}`}>
        <Card size="small" hoverable={true}>
          <Skeleton loading={false} avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={project.title}
              description={`Created ${project.created_at}`}
            />
          </Skeleton>
        </Card>
      </Link>
    </Col>
  );
}

export default Projects;