import React, { useEffect } from 'react';
import { Typography, Card, Form, Input, message, Button } from 'antd';
import { connect } from 'react-redux';
import { actions } from 'services';
import { useLocation, useParams } from 'react-router-dom';
import { usePrevious } from 'utils';
import queryString from 'query-string';

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

function EnvironmentSettings({ getEnvironmentInfo, isProcessing, isProcessingUpdate, isSuccessUpdate, isErrorUpdate, environment, getProjectInfo, updateEnvironment, generateNewSecretKey, isProcessingNewSecret }) {
  const [envNameForm] = Form.useForm();
  const [secretKeyForm] = Form.useForm();
  const prevIsProcessingUpdate = usePrevious(isProcessingUpdate);
  // @ts-ignore
  const { id } = useParams();
  const environment_id = id;

  const location = useLocation();
  const params = queryString.parse(location.search);
  const project_id = params['project_id'] ?? null;

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

  useEffect(() => {
    if (prevIsProcessingUpdate !== undefined && prevIsProcessingUpdate !== isProcessingUpdate) {
      if (isSuccessUpdate) {
        message.success('Environment successfully updated!');
        getEnvironmentInfo(environment_id, true);
        getProjectInfo(project_id);
      }

      if (isErrorUpdate) {
        message.error('Failed to update environment');
      }
    }
  });  

  const onEnvNameSubmit = (values) => {
    updateEnvironment(environment_id, values.environment_name);
  };

  const generateSecretKey = () => {
    generateNewSecretKey(environment_id);
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
            <Input disabled={isProcessingUpdate || isProcessing} autoComplete="off" />
          </Form.Item>
        </Form>
      </Card>

      <Card 
        title="Environment Security" 
        bordered={true} 
        className="setting-card"
        size="small"
      >
        <Form {...layout} form={secretKeyForm} onFinish={generateSecretKey}>        
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
            <Button htmlType="submit" disabled={isProcessing || isProcessingNewSecret}>
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

    isProcessingUpdate: settings.isProcessingUpdate,
    isErrorUpdate: settings.isErrorUpdate,
    isSuccessUpdate: settings.isSuccessUpdate,

    isProcessingNewSecret: settings.isProcessingNewSecret,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProjectInfo: (project_id) => dispatch(actions.ProjectActions.getProjectInfo(project_id)),
    getEnvironmentInfo: (environment_id, silent = false) => dispatch(actions.SettingsActions.getEnvironmentInfo(environment_id, silent)),
    updateEnvironment: (environment_id, name) => dispatch(actions.SettingsActions.updateEnvironment(environment_id, name)),
    generateNewSecretKey: (environment_id) => dispatch(actions.SettingsActions.generateNewSecretKey(environment_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentSettings);