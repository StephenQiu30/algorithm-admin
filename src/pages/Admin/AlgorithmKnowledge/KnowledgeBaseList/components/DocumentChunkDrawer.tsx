import { Drawer, Tag, Space, Typography } from 'antd';
import React, { useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { listChunkVoByPage } from '@/services/ai/chunkController';

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
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.ChunkVO>[] = [
    {
      title: '序号',
      dataIndex: 'chunkIndex',
      width: 80,
      align: 'center',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '内容',
      dataIndex: 'content',
      ellipsis: true,
      copyable: true,
      render: (text) => (
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}>
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: '字数',
      dataIndex: 'wordCount',
      width: 100,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 160,
      hideInSearch: true,
    },
  ];

  return (
    <Drawer
      title="文档分片详情"
      width={1000}
      open={visible}
      onClose={onClose}
      destroyOnClose
    >
      <ProTable<API.ChunkVO, API.ChunkQueryRequest>
        headerTitle="分片列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        request={async (params) => {
          if (!documentId) return { success: false };
          const { data, code } = await listChunkVoByPage({
            ...params,
            documentId,
          });
          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
        }}
      />
    </Drawer>
  );
};

export default DocumentChunkDrawer;
