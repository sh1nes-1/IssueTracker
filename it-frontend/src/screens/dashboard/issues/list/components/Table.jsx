import React, { useState } from 'react';
import { Table } from 'antd';
import IssueItem from './Item';
import TableActions from './TableActions';

const { Column } = Table;

function IssuesTable({ project_id, loading, currentPage, issues, totalCount, onPageChanged }) {  
  const [selectedKeys, setSelectedKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, _) => {      
      setSelectedKeys(selectedRowKeys);
    }
  };

  return (
    <div >
      <Table
        tableLayout='fixed'
        className='issues-table'
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        dataSource={issues}
        rowKey="id"
        loading={loading}
        pagination={{ current: currentPage, pageSize: 25, total: totalCount, showSizeChanger: false, onChange: onPageChanged }}
      >
        <Column 
          title={() => TableActions(selectedKeys)} 
          dataIndex="issue" 
          key="issue" 
          width="95%" 
          render={(_, issue) => IssueItem(project_id, issue)}             
          />

        <Column 
          title="Events" 
          dataIndex="events" 
          key="events" 
          width="5%" 
          align="center"             
          />
      </Table>
    </div>
  );
}

export default IssuesTable;