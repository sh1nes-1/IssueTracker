import React from 'react';
import { Typography, Card, Form, Input, message } from 'antd';

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function General() {
  const [projectNameForm] = Form.useForm();

  const onFinish = (values) => {
    // TODO: useEffect isSuccess
    message.success('This is a success message');
  };

  return (
    <React.Fragment>
      <Title className="settings-title">
        General
      </Title>

      <Card 
        title="Project info" 
        bordered={true} 
        className="setting-card"
        size="small"
      >
        <Form {...layout} form={projectNameForm} onFinish={onFinish}>        
          <Form.Item
            colon={false}
            labelAlign="left"
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input project name!' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
}

export default General;