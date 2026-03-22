import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Popconfirm, Space, Typography } from 'antd';
import React, { useRef } from 'react';
import { deleteAiChatRecord, listAiChatRecordByPage } from '@/services/ai/aiChatRecordController';

/**
 * AI 对话记录管理
 * @constructor
 */
const AiChatRecordList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  /**
   * 删除节点
   * @param row
   */
  const handleDelete = async (row: API.AiChatRecord) => {
    if (!row?.id) return;
    const hide = message.loading('正在删除');
    try {
      const res = await deleteAiChatRecord({ id: row.id as any });
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
  const columns: ProColumns<API.AiChatRecord>[] = [
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
      title: '用户ID',
      dataIndex: 'userId',
      valueType: 'text',
      copyable: true,
      width: 120,
    },
    {
      title: '对话内容',
      dataIndex: 'message',
      valueType: 'textarea',
      ellipsis: true,
    },
    {
      title: 'AI 响应',
      dataIndex: 'response',
      valueType: 'textarea',
      ellipsis: true,
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
        </Space>
      ),
    },
  ];

  return (
    <ProTable<API.AiChatRecord, API.AiChatRecordQueryRequest>
      headerTitle="AI 对话记录"
      actionRef={actionRef}
      rowKey="id"
      search={{ labelWidth: 100 }}
      request={async (params, sort, filter) => {
        const sortField = Object.keys(sort)?.[0] || 'createTime';
        const sortOrder = sort?.[sortField] ?? 'descend';

        const { data, code } = await listAiChatRecordByPage({
          ...params,
          ...filter,
          sortField,
          sortOrder,
        } as API.AiChatRecordQueryRequest);

        return {
          success: code === 0,
          data: data?.records || [],
          total: Number(data?.total) || 0,
        };
      }}
      columns={columns}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default AiChatRecordList;
