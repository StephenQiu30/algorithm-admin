import { ModalForm, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Button, Divider, Tag, Typography } from 'antd';
import React from 'react';

interface Props {
  record?: API.RAGHistoryVO;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 查看 RAG 对话详情
 * @param props
 * @constructor
 */
const ViewRagHistoryModal: React.FC<Props> = (props) => {
  const { record, visible, onCancel } = props;

  if (!record) return null;

  return (
    <ModalForm
      title="对话详情"
      open={visible}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
      submitter={{
        render: () => [
          <Button key="close" onClick={onCancel}>
            关闭
          </Button>,
        ],
      }}
      width={900}
      modalProps={{
        destroyOnClose: true,
      }}
    >
      <ProDescriptions
        column={2}
        dataSource={record}
        columns={[
          { title: '记录 ID', dataIndex: 'id', copyable: true },
          { title: '完成时间', dataIndex: 'createTime', valueType: 'dateTime' },
          {
            title: '知识库',
            dataIndex: 'knowledgeBaseId',
            render: (id) => <Tag color="blue">K-BASE #{id}</Tag>,
          },
          {
            title: '响应耗时',
            dataIndex: 'responseTime',
            render: (v) => {
              const t = Number(v);
              const color = t > 1500 ? (t > 3500 ? '#ff4d4f' : '#faad14') : '#52c41a';
              return <Typography.Text style={{ color, fontWeight: 700 }}>{v}ms</Typography.Text>;
            },
          },
        ]}
      />

      <Divider style={{ margin: '16px 0' }} />

      <div style={{ marginBottom: 24 }}>
        <Typography.Title
          level={5}
          style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <div style={{ width: 4, height: 16, background: '#1677ff', borderRadius: 2 }} />
          提问 (Question)
        </Typography.Title>
        <div
          style={{
            padding: '12px 16px',
            background: '#f5f5f5',
            borderRadius: '8px',
            border: '1px solid #f0f0f0',
          }}
        >
          <Typography.Text style={{ lineHeight: '1.8', fontSize: '14px', fontWeight: 500 }}>
            {record.question}
          </Typography.Text>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Typography.Title
          level={5}
          style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <div style={{ width: 4, height: 16, background: '#52c41a', borderRadius: 2 }} />
          回答 (Answer)
        </Typography.Title>
        <div
          style={{
            padding: '16px',
            background: '#f6ffed',
            borderRadius: '12px',
            border: '1px solid #b7eb8f',
          }}
        >
          <Typography.Paragraph
            style={{ margin: 0, lineHeight: '1.8', fontSize: '14px', whiteSpace: 'pre-wrap' }}
          >
            {record.answer}
          </Typography.Paragraph>
        </div>
      </div>

      <Divider style={{ margin: '24px 0 16px' }} />

      <Typography.Title
        level={5}
        style={{
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>引用向量源 (Sources)</span>
        <Tag color="processing">{record.sources?.length || 0} 个召回分片</Tag>
      </Typography.Title>

      <ProTable<API.RetrievalHitVO>
        dataSource={record.sources}
        pagination={false}
        search={false}
        toolBarRender={false}
        size="small"
        rowKey={(r, i) => `${r.id}-${i}`}
        bordered
        columns={[
          {
            title: '排序',
            valueType: 'indexBorder',
            width: 48,
          },
          {
            title: '得分',
            dataIndex: 'score',
            width: 100,
            render: (v) => (
              <Tag color="cyan" style={{ margin: 0, fontWeight: 600, border: 'none' }}>
                SCORE: {Number(v).toFixed(4)}
              </Tag>
            ),
          },
          {
            title: '文档名称',
            dataIndex: 'documentName',
            ellipsis: true,
            render: (text) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Typography.Text ellipsis style={{ maxWidth: 180, fontSize: '13px' }}>
                  {text as string}
                </Typography.Text>
              </div>
            ),
          },
          {
            title: '索引',
            dataIndex: 'chunkIndex',
            width: 70,
            align: 'center',
            render: (v) => <Tag style={{ margin: 0 }}>#{v}</Tag>,
          },
          {
            title: '召回内容预览',
            dataIndex: 'content',
            render: (v) => (
              <Typography.Paragraph
                ellipsis={{ rows: 2, expandable: true, symbol: '详情' }}
                style={{ margin: 0, fontSize: '12px', color: '#666' }}
              >
                {v as string}
              </Typography.Paragraph>
            ),
          },
        ]}
      />
    </ModalForm>
  );
};

export default ViewRagHistoryModal;
