import { ActionType, FooterToolbar, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Avatar, Button, message, Popconfirm, Space, Typography, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { deletePostComment, listPostCommentByPage } from '@/services/post/postCommentController';
import UpdateCommentModal from '@/pages/Admin/CommentList/components/UpdateCommentModal';
import ViewCommentModal from '@/pages/Admin/CommentList/components/ViewCommentModal';

/**
 * 评论管理列表
 * @constructor
 */
const CommentList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 状态管理
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.PostCommentVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.PostCommentVO[]>([]);

  /**
   * 删除节点
   * @param row
   */
  const handleDelete = async (row: API.PostCommentVO) => {
    if (!row?.id) return;
    const hide = message.loading('正在删除');
    try {
      const res = await deletePostComment({ id: row.id as any });
      if (res.code === 0) {
        message.success('删除成功');
        actionRef.current?.reload();
      } else {
        message.error(`删除失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`删除报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 批量删除节点
   * @param selectedRows
   */
  const handleBatchDelete = async (selectedRows: API.PostCommentVO[]) => {
    if (!selectedRows?.length) return;
    const hide = message.loading('正在删除');
    try {
      const res = await Promise.all(
        selectedRows.map((row) => deletePostComment({ id: row.id as any })),
      );
      if (res.every((r) => r.code === 0)) {
        message.success('批量删除成功');
        actionRef.current?.reloadAndRest?.();
        setSelectedRows([]);
      } else {
        message.error('部分内容删除失败');
      }
    } catch (error: any) {
      message.error(`批量删除报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 表格列定义
   */
  const columns: ProColumns<API.PostCommentVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      copyable: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: '作者',
      dataIndex: 'userVO',
      valueType: 'text',
      width: 150,
      render: (_, record) => (
        <Space>
          <Avatar src={record.userVO?.userAvatar} size="small">
            {record.userVO?.userName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography.Text strong>{record.userVO?.userName || record.userId}</Typography.Text>
        </Space>
      ),
    },
    {
      title: '帖子 ID',
      dataIndex: 'postId',
      valueType: 'text',
      copyable: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '父评论 ID',
      dataIndex: 'parentId',
      valueType: 'text',
      copyable: true,
      ellipsis: true,
      width: 120,
      render: (id) => id || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      width: 160,
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <ViewCommentModal comment={record}>
            <Typography.Link key="view" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined /> 详情
            </Typography.Link>
          </ViewCommentModal>
          <Typography.Link
            key="update"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            <EditOutlined /> 编辑
          </Typography.Link>
          <Popconfirm
            title="确定删除此评论吗？"
            description="删除后将无法恢复。"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link
              key="delete"
              type="danger"
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <DeleteOutlined /> 删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.PostCommentVO, any>
        headerTitle="评论管理"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listPostCommentByPage({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as any);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        scroll={{ x: 'max-content' }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
            </div>
          }
        >
          <Popconfirm
            title="确定批量删除？"
            description="删除后将无法恢复？"
            onConfirm={() => handleBatchDelete(selectedRowsState)}
          >
            <Button danger type="primary">
              批量删除
            </Button>
          </Popconfirm>
        </FooterToolbar>
      )}
      <UpdateCommentModal
        visible={updateModalVisible}
        oldData={currentRow}
        onCancel={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />
    </>
  );
};

export default CommentList;
