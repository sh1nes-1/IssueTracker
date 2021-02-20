import { Layout, Card, Button, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <Layout>
      <Row justify="center" align="middle" type="flex" className="fullHeight">
      
        {/* TODO: move card to some component */}
        <Card title="Login" className="col d-flex justify-content-center">
          <Button type="primary">Test</Button>

          <Link to='/register'>Register</Link>
        </Card>
        
      </Row>
    </Layout>
  );
}

export default Login;