import { Layout, Card, Button, Row, Input, Form } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from 'services';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 17,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 17,
  },
};

function Login({ signIn, isProcessing, isError }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    signIn(values.email, values.password);
  };

  useEffect(() => {
    if (isError) {
      form.setFields([
        {
          name: 'password',
          errors: ['Failed to login using provided email and password!'],
        },
      ]);
    }
  }, [isError, form]);

  return (
    <Layout>
      <Row justify="center" align="middle" className="fullHeight">
      
        <Card title="Login" className="col d-flex justify-content-center" style={{ width: 500 }}>
          <Form {...layout} form={form} onFinish={onFinish}>        
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' }, 
                { required: true, message: 'Please input your email!' }
              ]}
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
              <Button type="primary" htmlType="submit" disabled={isProcessing}>
                Login
              </Button>

              {/* <Button type="link" htmlType="button">
                <Link to='/register'>Register</Link>
              </Button> */}
            </Form.Item>
          </Form>
        </Card>

      </Row>
    </Layout>
  );
}

function mapStateToProps({ auth }) {
  return {
    isProcessing: auth.isProcessing,
    isError: auth.isError,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (email, password) => dispatch(actions.AuthActions.signIn(email, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);