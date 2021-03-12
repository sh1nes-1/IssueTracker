import React, { useEffect } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

function EditUser({ user, updateUser, getUsers, isProcessing, isSuccess, isError, errorsUpdateUser }) {
  const [form] = Form.useForm();
  const prevIsProcessing = usePrevious(isProcessing);

  const handleSubmit = (values) => {
    updateUser({
      id: user.id,
      ...values
    });
  };

  useEffect(() => {
    if (prevIsProcessing !== undefined && prevIsProcessing !== isProcessing) {
      if (isSuccess) {
        message.success('User successfully updated!');
        getUsers();
      }
  
      if (isError && errorsUpdateUser) {
        const fieldsErrors = Object.keys(errorsUpdateUser)
          .map(key => Object({
            name: key,
            errors: errorsUpdateUser[key],
          }));

        form.setFields(fieldsErrors);
      }
    }
  });

  return (
    <Form {...layout} form={form} onFinish={handleSubmit} className="modal-form" initialValues={user}>
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
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please select role' }]}
      >
        <Select placeholder="Select role">
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </Form.Item>

      <Form.Item
        colon={false}
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please select status' }]}
      >
        <Select placeholder="Select status">
          <Option value="active">Active</Option>
          <Option value="disabled">Disabled</Option>
        </Select>
      </Form.Item>

      <Form.Item
        colon={false}
        label="Password"
        name="password"
      >
        <Input autoComplete='off' type='password' placeholder='Enter new password' />
      </Form.Item>

      <Form.Item         
        colon={true}
        label="Projects"
      >
        {user.projects.length > 0 ?
          user.projects.map(project => project.status === 'active' ?  project.name : `${project.name} (deleted)`).join(', ') : 
          "User don't have projects"}
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={isProcessing}>
          Update
        </Button>
      </Form.Item>      
    </Form>
  );
}

function mapStateToProps({ admin }) {
  return {
    user: admin.selectedUser,
    isProcessing: admin.isProcessingUpdateUser,
    isSuccess: admin.isSuccessUpdateUser,
    isError: admin.isErrorUpdateUser,
    errorsUpdateUser: admin.errorsUpdateUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (user) => dispatch(actions.AdminActions.updateUser(user)),
    getUsers: () => dispatch(actions.AdminActions.getUsers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);