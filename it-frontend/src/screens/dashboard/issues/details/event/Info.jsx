import { Divider } from 'antd';
import React from 'react';
import EventHeader from './components/Header';
import { connect } from 'react-redux';
import EventBody from './components/Body';

function EventInfo({ issue, isProcessing }) {
  return (
    <React.Fragment>
      <Divider />
      <EventHeader isLoading={isProcessing} issue={issue} />
      <Divider />
      <EventBody issue={issue} />
    </React.Fragment>
  );
}

function mapStateToProps({ issues }) {
  return {
    isProcessing: issues.isProcessingIssue,
    issue: issues.issue,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);