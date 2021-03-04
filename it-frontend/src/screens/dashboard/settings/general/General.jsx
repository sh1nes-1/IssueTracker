import React, { useEffect } from 'react';
import { Typography, Card, Form, Input, message } from 'antd';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function General({ isProcessingProject, project, updateProject, isProcessingChangeName, isSuccessChangeName, isErrorChangeName, getProjects, setProjectLocal }) {
  const [projectNameForm] = Form.useForm();
  const prevIsProcessingChangeName = usePrevious(isProcessingChangeName);

  useEffect(() => {
    if (project) {
      projectNameForm.setFieldsValue({
        project_name: project.name
      });
    }
  }, [projectNameForm, project]);

  useEffect(() => {
    if (prevIsProcessingChangeName !== undefined && prevIsProcessingChangeName !== isProcessingChangeName) {
      if (isSuccessChangeName) {
        message.success('Project successfully updated!');
        getProjects();
      }

      if (isErrorChangeName) {
        message.error('Failed to update project');
      }
    }
  });

  const onFinish = (values) => {
    updateProject(project?.id, values.project_name);
    setProjectLocal({
      ...project,
      name: values.project_name
    });
  };

  return (
    <React.Fragment>
      <Title className="settings-title">
        General
      </Title>

      <Card 
        title="Project info" 
        bordered={true} 
        className="setting-card"
        size="small"
      >
        <Form {...layout} form={projectNameForm} onFinish={onFinish}>        
          <Form.Item
            colon={false}
            labelAlign="left"
            label="Name"
            name="project_name"
            rules={[{ required: true, message: 'Please input project name!' }]}
          >
            <Input 
              disabled={isProcessingProject || isProcessingChangeName}
              autoComplete="off"
            />
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
}

function mapStateToProps({ projects }) {
  return {
    isProcessingProject: projects.isProcessingProject,
    isErrorProject: projects.isErrorProject,
    project: projects.project,

    isProcessingChangeName: projects.isProcessingUpdate,
    isErrorChangeName: projects.isErrorUpdate,
    isSuccessChangeName: projects.isSuccessUpdate,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateProject: (project_id, name) => dispatch(actions.ProjectActions.updateProject(project_id, name)),
    setProjectLocal: (project) => dispatch(actions.ProjectActions.setProjectLocal(project)),
    getProjects: () => dispatch(actions.ProjectActions.getProjects()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(General);