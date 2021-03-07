import React from 'react';
import { Space, Button } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actions } from 'services';

function TableActions({ issues, selectedKeys, clearSelection, isResolving, isIgnoring, resolveIssues, ignoreIssues, totalIssuesCount, setIssuesLocal }) {
  const canResolve = (selectedKeys.length > 0) && !isResolving;
  const canIgnore = (selectedKeys.length > 0) && !isIgnoring;
  // const canMerge = selectedKeys.length > 1;

  const onResolveIssues = () => {
    const newIssues = issues.map(item => selectedKeys.includes(item.id) ? { ...item, is_resolved: true } : item);
    setIssuesLocal(newIssues);
    resolveIssues(selectedKeys)
    clearSelection();
  }

  const onIgnoreIssues = () => {
    const newIssues = issues.map(item => selectedKeys.includes(item.id) ? { ...item, is_ignored: true } : item);
    setIssuesLocal(newIssues);
    ignoreIssues(selectedKeys)
    clearSelection();
  }

  return (
    <Space>
      <Button 
        size='small' 
        disabled={!canResolve}
        onClick={onResolveIssues}
      >
        <CheckOutlined /> Resolve
      </Button>

      <Button 
        size='small' 
        disabled={!canIgnore}
        onClick={onIgnoreIssues}
      >
        <StopOutlined /> Ignore
      </Button>

      {/* <Button size='small' disabled={!canMerge}>
        Merge
      </Button> */}
    </Space>
  );
}

function mapStateToProps({ issues }) {
  return {
    issues: issues.issues,
    totalIssuesCount: issues.totalIssuesCount,

    isResolving: issues.isProcessingResolve,
    isErrorResolve: issues.isErrorResolve,
    isSuccessResolve: issues.isSuccessResolve,

    isIgnoring: issues.isProcessingIgnore,
    isErrorIgnore: issues.isErrorIgnore,
    isSuccessIgnore: issues.isSuccessIgnore,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ignoreIssues: (issues_ids) => dispatch(actions.IssuesActions.ignoreIssues(issues_ids)),
    resolveIssues: (issues_ids) => dispatch(actions.IssuesActions.resolveIssues(issues_ids)),
    setIssuesLocal: (issues) => dispatch(actions.IssuesActions.setIssuesLocal(issues)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableActions);