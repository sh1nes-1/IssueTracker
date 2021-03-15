
import React, { useEffect } from "react";
import { Button, Modal, message } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";
import history from "../../../../../history";

const { confirm } = Modal;

function showDeleteConfirm(environmentName, handleDelete) {
  confirm({
    title: `Are you sure you want to delete environment '${environmentName}'?`,
    icon: <ExclamationCircleOutlined />,
    content: 'This action cannot be undone',
    okText: 'Yes, delete it',
    okType: 'danger',
    cancelText: 'No, i changed my mind',
    autoFocusButton: 'cancel',
    closable: true,
    maskClosable: true,
    onOk: handleDelete,    
  });
}

function DeleteEnvironmentModal({ project_id, environment, isProcessing, isSuccess, isError, deleteEnvironment, getProjectInfo }) {
  const prevIsProcessing = usePrevious(isProcessing);

  const handleDelete = () => {
    deleteEnvironment(environment.id);    
  };

  useEffect(() => {
    if (prevIsProcessing !== undefined && prevIsProcessing !== isProcessing) {
      if (isSuccess) {
        getProjectInfo(project_id);
        message.success('Environment successfully deleted!');
        history.push(`/dashboard/settings/environments?project_id=${project_id}`);
      }
  
      if (isError) {
        message.error('Failed to delete environment');
      }
    }
  });

  return (
    <Button 
      danger
      onClick={() => showDeleteConfirm(environment.name ?? '', handleDelete)} 
      disabled={isProcessing}
      htmlType="submit"
    >
      <DeleteOutlined /> Delete this environment
    </Button>
  );
}

function mapStateToProps({ settings }) {
  return {
    isProcessing: settings.isProcessingDelete,
    isSuccess: settings.isSuccessDelete,
    isError: settings.isErrorDelete,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteEnvironment: (environment_id) => dispatch(actions.SettingsActions.deleteEnvironment(environment_id)),
    getProjectInfo: (project_id) => dispatch(actions.ProjectActions.getProjectInfo(project_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEnvironmentModal);