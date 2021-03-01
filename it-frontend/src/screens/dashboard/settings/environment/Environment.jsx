import React from 'react';
import { Typography, Card, Form, Input, message, Button } from 'antd';

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
};

function EnvironmentSettings() {
  const [envNameForm] = Form.useForm();
  const [secretKeyForm] = Form.useForm();

  const onEnvNameSubmit = (values) => {
    // TODO: useEffect isSuccess
    message.success('This is a success message');
  };

  const generateNewSecretKey = () => {
    console.log('Generated!');
  }

  return (
    <React.Fragment>
      <Title className="settings-title">
        Environment Settings
      </Title>

      <Card 
        title="Environment info" 
        bordered={true} 
        className="setting-card"
        size="small"
      >
        <Form {...layout} form={envNameForm} onFinish={onEnvNameSubmit}>        
          <Form.Item
            colon={false}
            labelAlign="left"
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input environment name!' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Form>
      </Card>

      <Card 
        title="Environment Security" 
        bordered={true} 
        className="setting-card"
        size="small"
      >
        <Form {...layout} form={secretKeyForm} onFinish={generateNewSecretKey}>        
          <Form.Item
            colon={false}
            labelAlign="left"
            label="Secret key"
          >
            <Input disabled={true} autoComplete="off" />
          </Form.Item>

          <Form.Item {...tailLayout} 
            className="align-right" 
            style={{ marginTop: '10px' }}
          >
            <Button htmlType="submit">
              Generate New
            </Button>
          </Form.Item>
        </Form>
      </Card>      
    </React.Fragment>
  );
}

export default EnvironmentSettings;