import React from 'react';
import { Table } from 'antd';

const { Column } = Table;

function UsersTable({ loading, currentPage, users, totalCount, onPageChanged, onRowClick }) {  
  return (
    <div>
      <Table
        tableLayout='fixed'
        className='users-table'
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ current: currentPage, pageSize: 10, total: totalCount, showSizeChanger: false, onChange: onPageChanged }}
        onRow={(r) => ({
            className: "cursor-pointer",
            onClick: () => onRowClick(r),
          })}
      >
        <Column 
          title="Name"
          dataIndex="name" 
          key="name"
          width="25%"
          />

        <Column 
          title="Email"
          dataIndex="email" 
          key="email" 
          width="25%"
          />

        <Column 
          title="Role" 
          dataIndex="role" 
          key="role" 
          width="10%" 
          />
          
        <Column 
          title="Status" 
          dataIndex="status" 
          key="status" 
          width="10%"
          align="right" 
          />
      </Table>
    </div>
  );
}

export default UsersTable;