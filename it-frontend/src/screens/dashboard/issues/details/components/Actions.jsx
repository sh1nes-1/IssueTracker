import React, { useEffect } from 'react';
import { Button, message, Space } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";

function IssueActions({ project_id, issue_id, isProcessingResolve, isErrorResolve, isSuccessResolve, isProcessingIgnore, isErrorIgnore, isSuccessIgnore, ignoreIssues, resolveIssues, getProjectInfo }) {
  const prevIsProcessingResolve = usePrevious(isProcessingResolve);
  const prevIsProcessingIgnore = usePrevious(isProcessingIgnore);

  useEffect(() => {
    if (prevIsProcessingResolve !== undefined && prevIsProcessingResolve !== isProcessingResolve) {
      if (isSuccessResolve) {
        message.success('Issue successfully resolved!');
        getProjectInfo(project_id);
      }

      if (isErrorResolve) {
        message.error('Failed to resolve issue');
      }
    }

    if (prevIsProcessingIgnore !== undefined && prevIsProcessingIgnore !== isProcessingIgnore) {
      if (isSuccessIgnore) {
        message.success('Issue successfully ignored!');
        getProjectInfo(project_id);
      }

      if (isErrorIgnore) {
        message.error('Failed to ignore issue');
      }
    }
  });
  
  const resolveIssue = () => {
    resolveIssues([issue_id]);
  }
  
  const ignoreIssue = () => {
    ignoreIssues([issue_id]);
  }

  return (
    <React.Fragment>
      <Space style={{ marginTop: '10px' }}>
        <Button icon={<CheckOutlined />} onClick={resolveIssue} disabled={isProcessingResolve}> 
          Resolve
        </Button>
        <Button icon={<StopOutlined />} onClick={ignoreIssue} disabled={isProcessingIgnore}>
          Ignore
        </Button>
      </Space>
    </React.Fragment>
  );
}

function mapStateToProps({ issues }) {
  return {
    isProcessingResolve: issues.isProcessingResolve,
    isErrorResolve: issues.isErrorResolve,
    isSuccessResolve: issues.isSuccessResolve,

    isProcessingIgnore: issues.isProcessingIgnore,
    isErrorIgnore: issues.isErrorIgnore,
    isSuccessIgnore: issues.isSuccessIgnore,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ignoreIssues: (issues_ids) => dispatch(actions.IssuesActions.ignoreIssues(issues_ids)),
    resolveIssues: (issues_ids) => dispatch(actions.IssuesActions.resolveIssues(issues_ids)),
    getProjectInfo: (project_id) => dispatch(actions.ProjectActions.getProjectInfo(project_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueActions);