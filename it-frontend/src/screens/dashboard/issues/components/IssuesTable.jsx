import React from 'react';
import { Table } from 'antd';
import IssueItem from './IssueItem';

const { Column } = Table;

const data = [
  {
    key: '1',
    issue: 'John Brown',
    events: 32,
  },
  {
    key: '2',
    issue: 'Jim Green',
    events: 42,
  },
  {
    key: '3',
    issue: 'Joe Black',
    events: 32,
  },
  {
    key: '4',
    issue: 'Disabled User',
    events: 99,
  },
];

function IssuesTable() {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  return (
    <Table
      className="issues-table"
      rowSelection={{ type: 'checkbox', ...rowSelection }}
      dataSource={data}
    >
      <Column title="Issue" dataIndex="issue" key="issue" render={(_, record) => IssueItem(record.issue)} />
      <Column title="Events" dataIndex="events" key="events" width="5%" align="center" />
    </Table>
  );
}

export default IssuesTable;