import React, { useEffect, useState } from "react";
import { Button, Input, Form, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 17
  },
};

function CreateProjectModal({ createProject, getProjects, isProcessing, isSuccess, isError }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const prevIsProcessing = usePrevious(isProcessing);

  const showModal = () => {
    setVisible(true);
  }

  const handleSubmit = (values) => {
    createProject(values.project_name);
  };

  const hideModal = () => {
    setVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    if (prevIsProcessing !== undefined && prevIsProcessing !== isProcessing) {
      if (isSuccess) {
        hideModal();
        getProjects();
      }
  
      if (isError) {
        form.setFields([
          {
            name: 'project_name',
            errors: ['Failed to create project with that name'],
          },
        ]);
      }
    }
  });

  return (
    <React.Fragment>
      <Button 
        onClick={showModal} 
        disabled={isProcessing}
      >
        <PlusCircleOutlined /> Create Project
      </Button>

      <Modal 
        visible={visible} 
        onOk={form.submit} 
        onCancel={hideModal} 
        okButtonProps={{ disabled: isProcessing }}
      >
        <Form {...layout} form={form} onFinish={handleSubmit} className="modal-form">
          <Form.Item
            colon={false}
            label="Project name"
            name="project_name"
            rules={[{ required: true, message: 'Please enter your project name!' }]}
          >
            <Input autoComplete='off' />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

function mapStateToProps({ projects }) {
  return {
    isProcessing: projects.isProcessingCreate,
    isSuccess: projects.isSuccessCreate,
    isError: projects.isErrorCreate,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: (name) => dispatch(actions.ProjectActions.createProject(name)),
    getProjects: () => dispatch(actions.ProjectActions.getProjects()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectModal);