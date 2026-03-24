import { EyeOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { listHistoryByPage } from '@/services/ai/ragController';
import ViewRagHistoryModal from './components/ViewRagHistoryModal';

/**
 * RAG 对话记录管理
 * @constructor
 */
const Rag: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [viewVisible, setViewVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RAGHistoryVO>();

  /**
   * 表格列定义
   */
  const columns: ProColumns<API.RAGHistoryVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 64,
    },
    {
      title: '问题',
      dataIndex: 'question',
      valueType: 'textarea',
      width: 200,
      render: (text) => (
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}>
          {text as string}
        </Typography.Paragraph>
      ),
    },
    {
      title: '答案',
      dataIndex: 'answer',
      valueType: 'textarea',
      width: 300,
      render: (text) => (
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}>
          {text as string}
        </Typography.Paragraph>
      ),
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
      title: '响应时间',
      dataIndex: 'responseTime',
      width: 100,
      hideInSearch: true,
      render: (time) => {
        const t = time as number;
        let color = 'green';
        if (t > 1000) color = 'orange';
        if (t > 3000) color = 'red';
        return <Tag color={color}>{t}ms</Tag>;
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
          <Typography.Link
            key="view"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              setCurrentRow(record);
              setViewVisible(true);
            }}
          >
            <EyeOutlined /> 详情
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.RAGHistoryVO, API.RAGHistoryQueryRequest>
        headerTitle="RAG 对话记录"
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
      <ViewRagHistoryModal
        record={currentRow}
        visible={viewVisible}
        onCancel={() => {
          setViewVisible(false);
          setCurrentRow(undefined);
        }}
      />
    </>
  );
};

export default Rag;

