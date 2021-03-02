import React, { useEffect } from 'react';
import { Typography, Card, Form, Input, message, Button } from 'antd';
import { connect } from 'react-redux';
import { actions } from 'services';
import { useParams } from 'react-router-dom';

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

function EnvironmentSettings({ getEnvironmentInfo, isProcessing, isError, environment }) {
  const [envNameForm] = Form.useForm();
  const [secretKeyForm] = Form.useForm();
  // @ts-ignore
  const { id } = useParams();
  const environment_id = id;

  useEffect(() => {
    if (!environment || environment.id.toString() !== environment_id) {
      getEnvironmentInfo(environment_id);
    }
  }, [environment, environment_id, getEnvironmentInfo]);

  useEffect(() => {
    envNameForm.setFieldsValue({
      environment_name: environment?.name ?? ''
    });
  }, [envNameForm, environment]);

  useEffect(() => {
    secretKeyForm.setFieldsValue({
      secret_key: environment?.secret_key ?? ''
    });
  }, [secretKeyForm, environment]);

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
            name="environment_name"
            rules={[{ required: true, message: 'Please input environment name!' }]}            
          >
            <Input disabled={isProcessing} autoComplete="off" />
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
            name="secret_key"
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

function mapStateToProps({ settings }) {
  return {
    isProcessing: settings.isProcessingEnvironment,
    isError: settings.isErrorEnvironment,
    environment: settings.environment,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getEnvironmentInfo: (environment_id) => dispatch(actions.SettingsActions.getEnvironmentInfo(environment_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentSettings);