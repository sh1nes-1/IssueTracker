import React from 'react';
import { Table } from 'antd';
import IssueItem from './Item';

const { Column } = Table;

function IssuesTable({ loading, currentPage, issues, totalCount, onPageChanged }) {  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  return (
    <Table
      tableLayout='fixed'
      className="issues-table"
      rowSelection={{ type: 'checkbox', ...rowSelection }}
      dataSource={issues}
      rowKey="id"
      loading={loading}
      pagination={{ current: currentPage, pageSize: 25, total: totalCount, showSizeChanger: false, onChange: onPageChanged }}
    >
      <Column title="Issue" dataIndex="issue" key="issue" width="95%" render={(_, issue) => IssueItem(issue)} />
      <Column title="Events" dataIndex="events" key="events" width="5%" align="center" />
    </Table>
  );
}

export default IssuesTable;