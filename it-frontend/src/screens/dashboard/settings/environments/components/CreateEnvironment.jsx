import React, { useState } from 'react';
import { Button, Input, Form, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14
  },
};

function CreateEnvironmentModal() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();  

  const showModal = () => {
    setVisible(true);
  }

  const handleSubmit = (values) => {
    
  };

  const hideModal = () => {
    setVisible(false);
    form.resetFields();
  };


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
        // okButtonProps={{ disabled: isProcessing }}
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

export default CreateEnvironmentModal;