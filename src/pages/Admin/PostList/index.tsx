import { ActionType, FooterToolbar, ProColumns, ProTable } from '@ant-design/pro-components';

import { Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TAG_EMPTY } from '@/constants';
import { deletePost, listPostByPage } from '@/services/post/postController';
import { reviewStatus } from '@/enums/ReviewStatusEnum';
import CreatePostModal from '@/pages/Admin/PostList/components/CreatePostModal';
import UpdatePostModal from '@/pages/Admin/PostList/components/UpdatePostModal';
import ViewPostModal from '@/pages/Admin/PostList/components/ViewPostModal';
import ReviewPostModal from '@/pages/Admin/PostList/components/ReviewPostModal';
import BatchReviewPostModal from '@/pages/Admin/PostList/components/BatchReviewPostModal';
import { batchUpsertPost } from '@/services/search/searchController';

/**
 * 用户管理列表
 * @constructor
 */
const PostList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 状态管理
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
  const [batchReviewModalVisible, setBatchReviewModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.PostVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.PostVO[]>([]);

  /**
   * 删除节点
   * @param row
   */
  const handleDelete = async (row: API.PostVO) => {
    if (!row?.id) return;
    const hide = message.loading('正在删除');
    try {
      const res = await deletePost({ id: row.id as any });
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
  const handleBatchDelete = async (selectedRows: API.PostVO[]) => {
    if (!selectedRows?.length) return;
    const hide = message.loading('正在删除');
    try {
      const res = await Promise.all(selectedRows.map((row) => deletePost({ id: row.id as any })));
      // Note: Assuming all deletes should succeed. In a real scenario, check individual results.
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
   * 批量同步到 ES
   * @param selectedRows
   */
  const handleBatchSyncToEs = async (selectedRows: API.PostVO[]) => {
    if (!selectedRows?.length) return;
    const hide = message.loading('正在同步到 ES');
    try {
      const res = await batchUpsertPost(
        selectedRows.map((row) => ({
          ...row,
          tags: typeof row.tags === 'string' ? JSON.parse(row.tags || '[]') : row.tags,
        }) as API.PostEsDTO),
      );
      if (res.code === 0) {
        message.success('同步到 ES 成功');
      } else {
        message.error(`同步失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`同步报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 表格列定义
   */
  const columns: ProColumns<API.PostVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
      copyable: true,
      ellipsis: true,
      width: 120,
    },

    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '全局搜索',
      dataIndex: 'searchText',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '封面',
      dataIndex: 'cover',
      valueType: 'image',
      fieldProps: { width: 48 },
      hideInSearch: true,
      width: 80,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      width: 160,
      render: (_, record) => {
        const tags: string[] =
          typeof record.tags === 'string' ? JSON.parse(record.tags || '[]') : record.tags || [];
        if (tags.length === 0) return <Tag>{TAG_EMPTY}</Tag>;
        return (
          <Space wrap size={4}>
            {tags.map((tag) => (
              <Tag key={tag} color="blue">
                {tag}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueType: 'select',
      valueEnum: reviewStatus,
      width: 100,
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      sorter: true,
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <ViewPostModal post={record}>
            <Typography.Link key="view">查看</Typography.Link>
          </ViewPostModal>
          <Typography.Link
            key="review"
            onClick={() => {
              setCurrentRow(record);
              setReviewModalVisible(true);
            }}
          >
            审核
          </Typography.Link>
          <Typography.Link
            key="update"
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="确定删除？"
            description="删除后将无法恢复？"
            onConfirm={() => handleDelete(record)}
          >
            <Typography.Link key="delete" type="danger">
              删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.PostVO, API.PostQueryRequest>
        headerTitle="帖子管理"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            新建
          </Button>,
        ]}

        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listPostByPage({
            ...params,
            ...filter,
            tags: params.tags ? (Array.isArray(params.tags) ? params.tags : [params.tags]) : undefined,
            sortField,
            sortOrder,
          } as API.PostQueryRequest);

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
          <Space>
            <Button type="primary" onClick={() => handleBatchSyncToEs(selectedRowsState)}>
              同步到 ES
            </Button>
            <Button type="primary" onClick={() => setBatchReviewModalVisible(true)}>
              批量审核
            </Button>
            <Popconfirm
              title="确定批量删除？"
              description="删除后将无法恢复？"
              onConfirm={() => handleBatchDelete(selectedRowsState)}
            >
              <Button type="primary" danger>
                批量删除
              </Button>
            </Popconfirm>
          </Space>
        </FooterToolbar>
      )}


      <CreatePostModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
      />

      <UpdatePostModal
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

      <ReviewPostModal
        visible={reviewModalVisible}
        oldData={currentRow}
        onCancel={() => {
          setReviewModalVisible(false);
          setCurrentRow(undefined);
        }}
        onSubmit={() => {
          setReviewModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />

      <BatchReviewPostModal
        visible={batchReviewModalVisible}
        posts={selectedRowsState}
        onCancel={() => setBatchReviewModalVisible(false)}
        onSubmit={() => {
          setBatchReviewModalVisible(false);
          setSelectedRows([]);
          actionRef.current?.reload();
        }}
      />
    </>
  );
};

export default PostList;
