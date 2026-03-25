import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Badge, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { listRagHistoryVoByPage } from '@/services/ai/ragController';
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
      title: '问题',
      dataIndex: 'question',
      valueType: 'textarea',
      width: 280,
      render: (text) => (
        <div style={{ padding: '8px 0' }}>
          <Typography.Paragraph
            ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}
            style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', fontWeight: 500 }}
          >
            {text as string}
          </Typography.Paragraph>
        </div>
      ),
    },
    {
      title: '答案',
      dataIndex: 'answer',
      valueType: 'textarea',
      width: 400,
      render: (text) => (
        <div
          style={{
            padding: '12px',
            background: '#f8f9fb',
            border: '1px solid #eef0f2',
            borderRadius: '8px',
          }}
        >
          <Typography.Paragraph
            ellipsis={{ rows: 2, expandable: true, symbol: '展开全文' }}
            style={{ margin: 0, fontSize: '13px', color: 'rgba(0, 0, 0, 0.65)', lineHeight: '1.7' }}
          >
            {text as string}
          </Typography.Paragraph>
        </div>
      ),
    },
    {
      title: '响应耗时',
      dataIndex: 'responseTime',
      width: 120,
      align: 'center',
      hideInSearch: true,
      sorter: true,
      render: (time) => {
        const t = Number(time);
        let status: any = 'success';
        let color = '#52c41a';
        if (t > 1500) {
          status = 'warning';
          color = '#faad14';
        }
        if (t > 3500) {
          status = 'error';
          color = '#ff4d4f';
        }
        return (
          <Space size={4}>
            <Badge status={status} />
            <Typography.Text style={{ color, fontWeight: 600, fontSize: '13px' }}>
              {t}ms
            </Typography.Text>
          </Space>
        );
      },
    },
    {
      title: '引用源',
      dataIndex: 'sources',
      width: 100,
      align: 'center',
      hideInSearch: true,
      render: (_, record) => (
        <Tag color="blue" style={{ borderRadius: '10px', border: 'none', padding: '0 10px' }}>
          {record.sources?.length || 0} 个
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      sorter: true,
      width: 160,
      render: (dom) => (
        <Typography.Text type="secondary" style={{ fontSize: '13px' }}>
          {dom}
        </Typography.Text>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 90,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            key="view"
            style={{ fontWeight: 500 }}
            onClick={() => {
              setCurrentRow(record);
              setViewVisible(true);
            }}
          >
            详情
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.RAGHistoryVO, API.RAGHistoryQueryRequest>
        headerTitle="AI 对话历史分析"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listRagHistoryVoByPage({
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
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
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
