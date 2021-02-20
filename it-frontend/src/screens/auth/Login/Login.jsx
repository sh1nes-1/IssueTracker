import { Layout, Card, Button, Row, Input, Form } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
    width: '2000px'
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <Row justify="center" align="middle" type="flex" className="fullHeight">
      
        <Card title="Login" className="col d-flex justify-content-center" style={{ width: 440 }}>
        <Form {...layout} form={form} onFinish={onFinish}>        
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>

            <Button type="link" htmlType="button">
              <Link to='/register'>Register</Link>
            </Button>
          </Form.Item>
        </Form>
          
        </Card>

      </Row>
    </Layout>
  );
}

export default Login;