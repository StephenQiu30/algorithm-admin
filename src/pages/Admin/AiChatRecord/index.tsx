import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef } from 'react';
import { listHistoryByPage } from '@/services/ai/ragController';

/**
 * AI 对话记录管理 (RAG 历史)
 * @constructor
 */
const AiChatRecordList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  /**
   * 表格列定义
   */
  const columns: ProColumns<API.RAGHistoryVO>[] = [
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
      title: '用户 ID',
      dataIndex: 'userId',
      valueType: 'text',
      copyable: true,
      width: 120,
    },
    {
      title: '知识库 ID',
      dataIndex: 'knowledgeBaseId',
      valueType: 'text',
      copyable: true,
      width: 120,
    },
    {
      title: '问题',
      dataIndex: 'question',
      valueType: 'textarea',
      ellipsis: true,
    },
    {
      title: '回答',
      dataIndex: 'answer',
      valueType: 'textarea',
      ellipsis: true,
    },
    {
      title: '响应时间',
      dataIndex: 'responseTime',
      width: 100,
      hideInSearch: true,
      render: (time) => <Tag color="blue">{time}ms</Tag>,
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
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link key="view" onClick={() => message.info('详情功能开发中')}>
            详情
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<API.RAGHistoryVO, API.RAGHistoryQueryRequest>
      headerTitle="AI 对话记录"
      actionRef={actionRef}
      rowKey="id"
      search={{ labelWidth: 100 }}
      request={async (params, sort, filter) => {
        const sortField = Object.keys(sort)?.[0] || 'createTime';
        const sortOrder = sort?.[sortField] ?? 'descend';

        const { data, code } = await listHistoryByPage({
          ...params,
          ...filter,
          sortField,
          sortOrder,
        } as API.RAGHistoryQueryRequest);

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
