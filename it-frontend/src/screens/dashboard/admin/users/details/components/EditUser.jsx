import React from "react";
import { Button, Form, Input, Select } from "antd";

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

function EditUser({ user }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    
  };

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
        <Input autoComplete='off' placeholder='Enter new password' />
      </Form.Item>

      <Form.Item {...tailLayout}>
      {/* disabled={isProcessing} */}
        <Button type="primary" htmlType="submit" >
          Update
        </Button>

        {/* <Button type="link" htmlType="button">
          <Link to='/register'>Register</Link>
        </Button> */}
      </Form.Item>      
    </Form>
  );
}

export default EditUser;