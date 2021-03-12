
import React, { useEffect } from "react";
import { Button, Modal, message } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";
import history from "../../../../history";

const { confirm } = Modal;

function showDeleteConfirm(projectName, handleDelete) {
  confirm({
    title: `Are you sure you want to delete project '${projectName}'?`,
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

function DeleteProjectModal({ project, isProcessing, isSuccess, isError, deleteProject, getProjects }) {
  const prevIsProcessing = usePrevious(isProcessing);

  const handleDelete = () => {
    deleteProject(project.id);    
  };

  useEffect(() => {
    if (prevIsProcessing !== undefined && prevIsProcessing !== isProcessing) {
      if (isSuccess) {
        getProjects();        
        message.success('Project successfully deleted!');
        history.push('/dashboard/projects');
      }
  
      if (isError) {
        message.error('Failed to delete project');
      }
    }
  });

  return (
    <Button 
      danger
      onClick={() => showDeleteConfirm(project.name ?? '', handleDelete)} 
      disabled={isProcessing}
      htmlType="submit"            
    >
      <DeleteOutlined /> Delete this project
    </Button>
  );
}

function mapStateToProps({ projects }) {
  return {
    isProcessing: projects.isProcessingDelete,
    isSuccess: projects.isSuccessDelete,
    isError: projects.isErrorDelete,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteProject: (project_id) => dispatch(actions.ProjectActions.deleteProject(project_id)),
    getProjects: () => dispatch(actions.ProjectActions.getProjects()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProjectModal);