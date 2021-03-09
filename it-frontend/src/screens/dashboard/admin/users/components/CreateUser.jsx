import React, { useEffect, useState } from "react";
import { Button, Input, Form, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";
import { randomBytes } from 'crypto';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 17
  },
};

function CreateUserModal({ isProcessing }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const randomPassword = randomBytes(6).toString('hex'); // each byte is two characters

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
        disabled={isProcessing}
      >
        <PlusCircleOutlined /> Create new User
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name!' }]}
          >
            <Input autoComplete='off' />
          </Form.Item>

          <Form.Item
            colon={false}
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter last name!', type: 'email' }]}
          >
            <Input autoComplete='off' />
          </Form.Item>

          <Form.Item
            colon={false}
            label="Password"
            name="password"            
            rules={[{ required: true, message: 'Please enter password!' }]}
          >
            <Input autoComplete='off' defaultValue={randomPassword} />
          </Form.Item>          
        </Form>
      </Modal>
    </React.Fragment>
  );
}

function mapStateToProps({ projects }) {
  return {
     isProcessing: false,
    // isSuccess: projects.isSuccessCreate,
    // isError: projects.isErrorCreate,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);