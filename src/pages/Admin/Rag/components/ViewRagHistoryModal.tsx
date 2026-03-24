import { ModalForm, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Tag, Divider, Typography, Button } from 'antd';
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
          <Button key="close" onClick={onCancel}>关闭</Button>
        ]
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
          { title: '记录 ID', dataIndex: 'id' },
          { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
          { title: '用户 ID', dataIndex: 'userId' },
          { title: '知识库 ID', dataIndex: 'knowledgeBaseId' },
          { 
            title: '响应耗时', 
            dataIndex: 'responseTime',
            render: (v) => <Tag color={Number(v) > 1000 ? 'orange' : 'green'}>{v}ms</Tag>
          },
        ]}
      />

      <Divider />

      <ProDescriptions
        column={1}
        dataSource={record}
        title="问答内容"
        columns={[
          { 
            title: '提问', 
            dataIndex: 'question',
          },
          { 
            title: '回答', 
            dataIndex: 'answer',
            render: (v) => <Typography.Paragraph style={{ marginBottom: 0 }}>{v as string}</Typography.Paragraph>
          },
        ]}
      />

      <Divider />

      <Typography.Title level={5} style={{ marginBottom: 16 }}>
        引用向量源 ({record.sources?.length || 0})
      </Typography.Title>
      
      <ProTable<API.RetrievalHitVO>
        dataSource={record.sources}
        pagination={false}
        search={false}
        toolBarRender={false}
        size="small"
        rowKey={(r, i) => `${r.id}-${i}`}
        columns={[
          {
            title: '得分',
            dataIndex: 'score',
            width: 80,
            render: (v) => <Tag color="blue">{Number(v).toFixed(4)}</Tag>
          },
          { title: '文档名称', dataIndex: 'documentName', ellipsis: true },
          { title: '分片', dataIndex: 'chunkIndex', width: 60 },
          { 
            title: '召回内容', 
            dataIndex: 'content',
            ellipsis: true,
            render: (v) => (
              <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '展开' }} style={{ margin: 0 }}>
                {v as string}
              </Typography.Paragraph>
            )
          },
        ]}
      />
    </ModalForm>
  );
};

export default ViewRagHistoryModal;
