import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TAG_EMPTY } from '@/constants';
import { deleteUsingPost, listVoByPage } from '@/services/post/algorithmKnowledgeController';
import CreateKnowledgeModal from './components/CreateKnowledgeModal';
import UpdateKnowledgeModal from './components/UpdateKnowledgeModal';

/**
 * 算法知识管理
 * @constructor
 */
const AlgorithmKnowledgeList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 状态管理
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.PostVO>();

  /**
   * 删除节点
   * @param row
   */
  const handleDelete = async (row: API.PostVO) => {
    if (!row?.id) return;
    const hide = message.loading('正在删除');
    try {
      const res = await deleteUsingPost({ id: row.id as any });
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
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="确定删除？"
            description="删除后将无法恢复？"
            onConfirm={() => handleDelete(record)}
          >
            <Typography.Link key="delete" type="danger">
              删除
            </Typography.Link>
          </Popconfirm>
          <Typography.Link
            key="update"
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            编辑
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.PostVO, API.PostQueryRequest>
        headerTitle="算法知识管理"
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

          const { data, code } = await listVoByPage({
            ...params,
            ...filter,
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
    </>
  );
};

export default AlgorithmKnowledgeList;
