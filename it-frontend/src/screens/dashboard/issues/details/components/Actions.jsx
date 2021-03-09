import React, { useEffect, useState } from 'react';
import { Button, message, Space } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";

function IssueActions({ isLoadingIssue, issue, isProcessingResolve, isErrorResolve, isSuccessResolve, isProcessingIgnore, isErrorIgnore, isSuccessIgnore, ignoreIssues, resolveIssues, setIssueLocal }) {
  const prevIsProcessingResolve = usePrevious(isProcessingResolve);
  const prevIsProcessingIgnore = usePrevious(isProcessingIgnore);
  
  const resolveBtnText = issue?.is_resolved ? 'Unresolve' : 'Resolve';
  const ignoreBtnText = issue?.is_ignored ? 'Unignore' : 'Ignore';

  useEffect(() => {
    if (prevIsProcessingResolve !== undefined && prevIsProcessingResolve !== isProcessingResolve) {
      if (isSuccessResolve) {
        message.success(`Issue successfully ${resolveBtnText.toLowerCase()}d!`);
        setIssueLocal({ 
          ...issue, 
          is_resolved: !issue.is_resolved,
        });
      } else if (isErrorResolve) {
        message.error('Failed to resolve issue');
      }
    }

    if (prevIsProcessingIgnore !== undefined && prevIsProcessingIgnore !== isProcessingIgnore) {
      if (isSuccessIgnore) {
        message.success(`Issue successfully ${ignoreBtnText.toLowerCase()}d!`);
        setIssueLocal({ 
          ...issue, 
          is_ignored: !issue.is_ignored,
        });
      } else if (isErrorIgnore) {
        message.error('Failed to ignore issue');
      }
    }
  });

  const onResolveBtnClick = () => {
    if (resolveBtnText === 'Resolve') {
      resolveIssues([issue?.id])
    } else {
      resolveIssues([issue?.id], false)
    }
  }

  const onIgnoreBtnClick = () => {
    if (ignoreBtnText === 'Ignore') {
      ignoreIssues([issue?.id])
    } else {
      ignoreIssues([issue?.id], false)
    }
  }

  return (
    <React.Fragment>
      <Space style={{ marginTop: '10px' }}>
        <Button 
          icon={<CheckOutlined />} 
          onClick={onResolveBtnClick} 
          disabled={isProcessingResolve || isLoadingIssue}
          > 
          {resolveBtnText}
        </Button>
        <Button 
          icon={<StopOutlined />} 
          onClick={onIgnoreBtnClick} 
          disabled={isProcessingIgnore || isLoadingIssue}
          >
          {ignoreBtnText}
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
    ignoreIssues: (issues_ids, ignore) => dispatch(actions.IssuesActions.ignoreIssues(issues_ids, ignore)),
    resolveIssues: (issues_ids, resolve) => dispatch(actions.IssuesActions.resolveIssues(issues_ids, resolve)),
    setIssueLocal: (issue) => dispatch(actions.IssuesActions.setIssueLocal(issue)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueActions);