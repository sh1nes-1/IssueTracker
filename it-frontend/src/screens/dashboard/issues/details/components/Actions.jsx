import React, { useEffect } from 'react';
import { Button, message, Space } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';
import { usePrevious } from "utils";

function IssueActions({ isLoadingIssue, issue, isProcessingResolve, isErrorResolve, isSuccessResolve, isProcessingIgnore, isErrorIgnore, isSuccessIgnore, ignoreIssues, resolveIssues, setIssueLocal }) {
  const prevIsProcessingResolve = usePrevious(isProcessingResolve);
  const prevIsProcessingIgnore = usePrevious(isProcessingIgnore);

  useEffect(() => {
    if (prevIsProcessingResolve !== undefined && prevIsProcessingResolve !== isProcessingResolve) {
      if (isSuccessResolve) {
        message.success('Issue successfully resolved!');
        setIssueLocal({ 
          ...issue, 
          is_resolved: true 
        });
      } else if (isErrorResolve) {
        message.error('Failed to resolve issue');
      }
    }

    if (prevIsProcessingIgnore !== undefined && prevIsProcessingIgnore !== isProcessingIgnore) {
      if (isSuccessIgnore) {
        message.success('Issue successfully ignored!');
        setIssueLocal({ 
          ...issue, 
          is_ignored: true 
        });
      } else if (isErrorIgnore) {
        message.error('Failed to ignore issue');
      }
    }
  });

  return (
    <React.Fragment>
      <Space style={{ marginTop: '10px' }}>
        <Button 
          icon={<CheckOutlined />} 
          onClick={() => resolveIssues([issue?.id])} 
          disabled={isProcessingResolve || isLoadingIssue || issue?.is_resolved}
          > 
          Resolve
        </Button>
        <Button 
          icon={<StopOutlined />} 
          onClick={() => ignoreIssues([issue?.id])} 
          disabled={isProcessingIgnore || isLoadingIssue || issue?.is_ignored}
          >
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
    setIssueLocal: (issue) => dispatch(actions.IssuesActions.setIssueLocal(issue)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueActions);