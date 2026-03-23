import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import CreateKnowledgeModal from './components/CreateKnowledgeModal';
import UpdateKnowledgeModal from './components/UpdateKnowledgeModal';
import KnowledgeRetrievalModal from './components/KnowledgeRetrievalModal';
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import { deleteKnowledgeBase, listMyKnowledgeBaseVoByPage } from '@/services/ai/knowledgeBaseController';
import { KnowledgeBaseStatusEnumMap } from '@/enums/KnowledgeBaseStatusEnum';

/**
 * 算法知识管理 (AI 知识库)
 * @constructor
 */
const AlgorithmKnowledgeList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 状态管理
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [retrievalModalVisible, setRetrievalModalVisible] = useState<boolean>(false);
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
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      copyable: true,
      ellipsis: true,
      width: 60,
    },
    {
      title: '知识库名称',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: KnowledgeBaseStatusEnumMap,
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      sorter: true,
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 320,
      render: (_, record) => (
        <Space size="middle" wrap>
          <Typography.Link
            key="manage"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              history.push(`/admin/algorithm/knowledge/document/${record.id}`);
            }}
          >
            <FileTextOutlined /> 管理文档
          </Typography.Link>
          <Typography.Link
            key="test"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              setCurrentRow(record);
              setRetrievalModalVisible(true);
            }}
          >
            <SearchOutlined /> 知识检索
          </Typography.Link>
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
            title="确定删除此知识库吗？"
            description="删除后，关联的文档和分片也将一并删除，且无法恢复。"
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
      <ProTable<API.KnowledgeBaseVO, API.KnowledgeBaseQueryRequest>
        headerTitle={
          <Space>
            <FileTextOutlined /> 知识库列表
          </Space>
        }
        actionRef={actionRef}
        rowKey="id"
        size="middle"
        cardProps={{
          bodyStyle: { padding: '16px 24px' },
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
          searchText: '查询',
          resetText: '重置',
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
      <KnowledgeRetrievalModal
        visible={retrievalModalVisible}
        knowledgeBaseId={currentRow?.id as any}
        onCancel={() => {
          setRetrievalModalVisible(false);
          setCurrentRow(undefined);
        }}
      />
    </>
  );
};

export default AlgorithmKnowledgeList;
