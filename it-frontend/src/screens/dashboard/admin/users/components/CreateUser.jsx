import React, { useEffect, useState } from "react";
import { Button, Input, Form, Modal, Select, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";
import { randomBytes } from 'crypto';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 17
  },
};

function CreateUserModal({ createUser, isProcessing, isSuccess, isError, errorsCreateUser }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const prevIsProcessing = usePrevious(isProcessing);
  const randomPassword = randomBytes(6).toString('hex'); // each byte is two characters  

  const initialValues = {
    'password': randomPassword,
    'role': 'user',
  };

  const showModal = () => {
    setVisible(true);
  }

  const handleSubmit = (values) => {
    createUser(values);
  };

  const hideModal = () => {
    setVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    if (prevIsProcessing !== isProcessing) {
      if (isSuccess) {
        message.success('User successfully created!');
        hideModal();
        //getUsers();
      }
  
      if (isError && errorsCreateUser) {
        const fieldsErrors = Object.keys(errorsCreateUser)
          .map(key => Object({
            name: key,
            errors: errorsCreateUser[key],
          }));

        form.setFields(fieldsErrors);
      }
    }
  });

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
        <Form {...layout} form={form} onFinish={handleSubmit} className="modal-form" initialValues={initialValues}>
          <Form.Item
            colon={false}
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input autoComplete='off' />
          </Form.Item>

          <Form.Item
            colon={false}
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter email', type: 'email' }]}
          >
            <Input autoComplete='off' />
          </Form.Item>

          <Form.Item
            colon={false}
            label="Password"
            name="password"            
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input autoComplete='off' />
          </Form.Item>

          <Form.Item
            colon={false}
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select placeholder="Select role">
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

function mapStateToProps({ admin }) {
  return {
    isProcessing: admin.isProcessingCreateUser,
    isSuccess: admin.isSuccessCreateUser,
    isError: admin.isErrorCreateUser,
    errorsCreateUser: admin.errorsCreateUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: (user) => dispatch(actions.AdminActions.createUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);