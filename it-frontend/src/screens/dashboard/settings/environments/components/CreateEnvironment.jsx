import React, { useEffect, useState } from 'react';
import { Button, Input, Form, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14
  },
};

function CreateEnvironmentModal({ project_id, createEnvironment, isProcessing, isSuccess, isError, getProjectInfo }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const prevIsProcessing = usePrevious(isProcessing);

  const showModal = () => {
    setVisible(true);
  }

  const handleSubmit = (values) => {
    createEnvironment(project_id, values.environment_name);
  };

  const hideModal = () => {
    setVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    if (prevIsProcessing !== isProcessing) {
      if (isSuccess) {
        hideModal();
        getProjectInfo(project_id);
      }
  
      if (isError) {
        form.setFields([
          {
            name: 'environment_name',
            errors: ['Failed to create environment with that name'],
          },
        ]);
      }
    }
  });


  return (
    <React.Fragment>
      <Button 
        onClick={showModal} 
      >
        <PlusCircleOutlined /> Create Environment
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
            label="Environment name"
            name="environment_name"
            rules={[{ required: true, message: 'Please enter environment name!' }]}
          >
            <Input autoComplete='off' />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}


function mapStateToProps({ settings }) {
  return {
    isProcessing: settings.isProcessingCreate,
    isSuccess: settings.isSuccessCreate,
    isError: settings.isErrorCreate,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createEnvironment: (project_id, name) => dispatch(actions.SettingsActions.createProjectEnvironment(project_id, name)),
    getProjectInfo: (project_id) => dispatch(actions.ProjectActions.getProjectInfo(project_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEnvironmentModal);