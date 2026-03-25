import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, Popconfirm, Space, Typography, Avatar, Badge, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import {
  deleteKnowledgeBase,
  listMyKnowledgeBaseVoByPage,
} from '@/services/ai/knowledgeBaseController';
import CreateKnowledgeModal from './components/CreateKnowledgeModal';
import UpdateKnowledgeModal from './components/UpdateKnowledgeModal';

/**
 * 算法知识管理 (AI 知识库)
 * @constructor
 */
const AlgorithmKnowledgeList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 状态管理
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.KnowledgeBaseVO>();

  /**
   * 删除知识库
   * @param row
   */
  const handleDelete = async (row: API.KnowledgeBaseVO) => {
    if (!row?.id) return;
    const hide = message.loading('正在删除');
    try {
      const res = await deleteKnowledgeBase({ id: row.id as any });
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
   * 表格列定义
   */
  const columns: ProColumns<API.KnowledgeBaseVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '知识库名称',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
      formItemProps: {
        rules: [{ required: true, message: '知识库名称为必填项' }],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建者',
      dataIndex: 'userVO',
      valueType: 'text',
      hideInSearch: true,
      width: 150,
      render: (_, record) => (
        <Space>
          <Avatar src={record.userVO?.userAvatar} size="small">
            {record.userVO?.userName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography.Text ellipsis>{record.userVO?.userName || '未知'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: '文档数量',
      dataIndex: 'documentCount',
      valueType: 'digit',
      hideInSearch: true,
      sorter: true,
      align: 'center',
      width: 100,
      render: (count) => (
        <Tag color={Number(count) > 0 ? 'blue' : 'default'} style={{ borderRadius: '10px', padding: '0 10px' }}>
          {count}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      sorter: true,
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 280,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            key="manage"
            onClick={() => {
              history.push(`/admin/algorithm/knowledge/document/${record.id}`);
            }}
          >
            <FileTextOutlined /> 管理
          </Typography.Link>
          <Typography.Link
            key="analysis"
            onClick={() => {
              history.push(`/admin/algorithm/knowledge/recall-analysis/${record.id}`);
            }}
          >
            <SearchOutlined /> 召回
          </Typography.Link>
          <Typography.Link
            key="update"
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            <EditOutlined /> 编辑
          </Typography.Link>
          <Popconfirm
            title="确定删除此知识库吗？"
            description="删除后，关联的文档和分片也将一并删除，且无法恢复。"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link key="delete" type="danger">
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
        title: '算法知识管理',
        breadcrumb: {},
      }}
    >
      <ProTable<API.KnowledgeBaseVO, API.KnowledgeBaseQueryRequest>
        headerTitle="知识库列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
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

          const { data, code } = await listMyKnowledgeBaseVoByPage({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.KnowledgeBaseQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
        scroll={{ x: 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
      />
      <CreateKnowledgeModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
      />
      <UpdateKnowledgeModal
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
    </PageContainer>
  );
};

export default AlgorithmKnowledgeList;
