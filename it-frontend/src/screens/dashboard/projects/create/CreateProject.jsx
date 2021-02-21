import React, { useState } from "react";
import { Button, Input, Form, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 17,
    width: '2000px'
  },
};

function CreateProjectModal() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  }

  const handleSubmit = (values) => {
    console.log(values);    
    hideModal();
  };

  const hideModal = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button onClick={showModal}>
        <PlusCircleOutlined /> Create Project
      </Button>

      <Modal visible={visible} onOk={form.submit} onCancel={hideModal}>
        <Form {...layout} form={form} onFinish={handleSubmit} className="modal-form">
          <Form.Item            
            label="Project name"
            name="project_name"
            rules={[{ required: true, message: 'Please enter your project name!' }]}
          >
            <Input autoComplete='off' />
          </Form.Item>
        </Form>
      </Modal>
  </div>
  );
}

export default CreateProjectModal;