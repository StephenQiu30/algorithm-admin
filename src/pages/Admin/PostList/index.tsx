import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProTable,
  StatisticCard,
} from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  FireOutlined,
  LikeOutlined,
  PlusOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { TAG_EMPTY } from '@/constants';
import { deletePost, listPostByPage } from '@/services/post/postController';
import { reviewStatus } from '@/enums/ReviewStatusEnum';
import CreatePostModal from '@/pages/Admin/PostList/components/CreatePostModal';
import UpdatePostModal from '@/pages/Admin/PostList/components/UpdatePostModal';
import ViewPostModal from '@/pages/Admin/PostList/components/ViewPostModal';
import ReviewPostModal from '@/pages/Admin/PostList/components/ReviewPostModal';
import BatchReviewPostModal from '@/pages/Admin/PostList/components/BatchReviewPostModal';
import { batchUpsertPost } from '@/services/search/searchController';
import { Avatar, Badge, Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 用户管理列表
 * @constructor
 */
const PostList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const location = useLocation();
  const focusPostId = new URLSearchParams(location.search).get('postId');

  // Modal 状态管理
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
  const [batchReviewModalVisible, setBatchReviewModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.PostVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.PostVO[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [pendingReviews, setPendingReviews] = useState<number>(0);
  const [pendingOnly, setPendingOnly] = useState<boolean>(false);

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
        selectedRows.map(
          (row) =>
            ({
              ...row,
              tags: typeof row.tags === 'string' ? JSON.parse(row.tags || '[]') : row.tags,
            } as API.PostEsDTO),
        ),
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
      copyable: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '作者',
      dataIndex: 'userVO',
      valueType: 'text',
      hideInSearch: true,
      width: 150,
      render: (_, record) => (
        <Space>
          <Avatar src={record.userVO?.userAvatar} size="small">
            {record.userVO?.userName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography.Text ellipsis>{record.userVO?.userName || '未知用户'}</Typography.Text>
        </Space>
      ),
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
      title: '点赞数',
      dataIndex: 'thumbNum',
      valueType: 'digit',
      hideInSearch: true,
      width: 80,
      render: (text) => (
        <Space size={4}>
          <LikeOutlined style={{ color: '#ff4d4f' }} />
          {text}
        </Space>
      ),
    },
    {
      title: '收藏数',
      dataIndex: 'favourNum',
      valueType: 'digit',
      hideInSearch: true,
      width: 80,
      render: (text) => (
        <Space size={4}>
          <StarOutlined style={{ color: '#faad14' }} />
          {text}
        </Space>
      ),
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
              <Tag key={tag} color="processing" style={{ borderRadius: 4 }}>
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
      render: (_, record) => {
        const status = record.reviewStatus;
        if (status === 0) return <Badge status="default" text="待审核" />;
        if (status === 1) return <Badge status="success" text="通过" />;
        if (status === 2) return <Badge status="error" text="驳回" />;
        return <Badge status="default" text="未知" />;
      },
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
      width: 260,
      render: (_, record) => (
        <Space size="middle">
          <ViewPostModal post={record}>
            <Typography.Link key="view" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined /> 查看
            </Typography.Link>
          </ViewPostModal>
          <Typography.Link
            key="review"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              setCurrentRow(record);
              setReviewModalVisible(true);
            }}
          >
            <CheckCircleOutlined /> 审核
          </Typography.Link>
          <Typography.Link
            key="update"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            <EditOutlined /> 修改
          </Typography.Link>
          <Popconfirm
            title="确定删除此帖子吗？"
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
    <PageContainer
      header={{
        title: '帖子管理',
        breadcrumb: {},
      }}
    >
      <StatisticCard.Group direction="row" gutter={16} style={{ marginBottom: 24 }}>
        <StatisticCard
          statistic={{
            title: '文章总量',
            value: totalPosts,
            icon: <ReadOutlined style={{ color: '#1890ff' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '审核统计',
            value: pendingReviews,
            suffix: '待审',
            valueStyle: { color: pendingReviews > 0 ? '#cf1322' : 'inherit' },
            icon: <SafetyCertificateOutlined style={{ color: '#faad14' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '活跃热度',
            value: '活跃',
            status: 'success',
            icon: <FireOutlined style={{ color: '#eb2f96' }} />,
          }}
        />
      </StatisticCard.Group>
      <ProTable<API.PostVO, API.PostQueryRequest>
        headerTitle="帖子管理"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        toolBarRender={() => [
          <Button key="toggle-review" onClick={() => setPendingOnly((value) => !value)}>
            {pendingOnly ? '查看全部帖子' : '只看待审核'}
          </Button>,
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        params={{
          id: focusPostId ? Number(focusPostId) : undefined,
          reviewStatus: focusPostId ? undefined : pendingOnly ? 0 : undefined,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listPostByPage({
            ...params,
            ...filter,
            tags: params.tags
              ? Array.isArray(params.tags)
                ? params.tags
                : [params.tags]
              : undefined,
            id: params.id,
            reviewStatus: params.reviewStatus,
            sortField,
            sortOrder,
          } as API.PostQueryRequest);

          if (code === 0) {
            setTotalPosts(Number(data?.total) || 0);
            // Derive pending reviews from current page as MVP indicator
            const pending = data?.records?.filter(r => r.reviewStatus === 0).length || 0;
            setPendingReviews(pending); 
          }

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
    </PageContainer>
  );
};

export default PostList;
