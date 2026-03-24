import { Drawer, Typography } from 'antd';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import React from 'react';
import { listDocumentChunkByPage } from '@/services/ai/documentChunkController';

interface Props {
  documentId?: number;
  visible: boolean;
  onClose: () => void;
}

/**
 * 文档分片详情抽屉
 * @param props
 * @constructor
 */
const DocumentChunkDrawer: React.FC<Props> = (props) => {
  const { documentId, visible, onClose } = props;

  const columns: ProColumns<API.DocumentChunk>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      width: 100,
    },
    {
      title: '分片内容',
      dataIndex: 'content',
      valueType: 'textarea',
      ellipsis: true,
      render: (text) => (
        <Typography.Paragraph ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}>
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Token 估值',
      dataIndex: 'tokenEstimate',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
  ];

  return (
    <Drawer
      title="文档分片详情"
      width={800}
      open={visible}
      onClose={onClose}
      destroyOnClose
    >
      <ProTable<API.DocumentChunk, API.DocumentChunkQueryRequest>
        headerTitle="分片列表"
        rowKey="id"
        search={false}
        request={async (params) => {
          if (!documentId) return { success: false };
          const { data, code } = await listDocumentChunkByPage({
            ...params,
            documentId: documentId as any,
          } as API.DocumentChunkQueryRequest);
          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
    </Drawer>
  );
};

export default DocumentChunkDrawer;
