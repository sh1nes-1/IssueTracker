import React, { useEffect } from 'react';
import { Typography, Card, Form, Input, message } from 'antd';
import { connect } from 'react-redux';
import { actions } from 'services';

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function General({ isProcessingProject, project }) {
  const [projectNameForm] = Form.useForm();

  useEffect(() => {
    if (project) {
      projectNameForm.setFieldsValue({
        name: project.name
      });
    }
  }, [projectNameForm, project]);

  const onFinish = (values) => {
    // TODO: useEffect isSuccess
    message.success('This is a success message');
  };

  console.log(`project: ${JSON.stringify(project)}`);

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
            name="name"
            rules={[{ required: true, message: 'Please input project name!' }]}
          >
            <Input 
              disabled={isProcessingProject} 
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(General);