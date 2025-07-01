import React from 'react'
import { Table, TablePaginationConfig, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

type Post = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  data: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  pagination?: TablePaginationConfig;
};

const TablePost = ({ data, onEdit, onDelete, pagination }: Props) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'description' },
    {
      title: 'Tags', dataIndex: 'tags', render: (tags: any[]) =>
        Array.isArray(tags)
          ? tags.map((tag, i) => tag?.tag || tag?.name || JSON.stringify(tag)).join(', ')
          : ''
    },
    {
      title: 'Actions',
      render: (_: any, record: Post) => (
        <div style={{ width: 80 }}>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} style={{ marginRight: 10 }} />
          <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} danger />
        </div>
      ),
    }
  ];

  return (
    <div style={{ fontSize: '10px' }}>
      <Table size='small' rowKey="id" dataSource={Array.isArray(data) ? data : []} columns={columns} pagination={pagination} scroll={{ y: 'calc(100vh - 250px)' }} style={{ padding: 8 }} />
    </div>
  )
}

export default TablePost