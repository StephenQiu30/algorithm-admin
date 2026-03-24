import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Drawer, Tag, Typography, Space, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import { listChunkVoByPage, searchChunks } from '@/services/ai/chunkController';

interface Props {
  documentId?: any;
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
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const renderScore = (score: number) => {
    if (score === undefined || score === null) return '-';
    const isSmall = score < 0.1;
    const tag = (
      <Tag color={isSmall ? 'purple' : 'orange'} style={{ margin: 0 }}>
        {isSmall ? '融合' : '分数'}: {score.toFixed(4)}
      </Tag>
    );

    return isSmall ? (
      <Tooltip title="分值较小通常代表该结果是通过 RRF (Reciprocal Rank Fusion) 算法计算出的融合排名分。">
        {tag}
      </Tooltip>
    ) : tag;
  };

  const columns: ProColumns<API.ChunkVO>[] = [
    {
      title: '分片索引',
      dataIndex: 'chunkIndex',
      width: 100,
      align: 'center',
      hideInSearch: true,
      render: (text) => <Tag color="blue" style={{ border: 'none' }}>#{text}</Tag>,
    },
    {
      title: '内容检索',
      dataIndex: 'query',
      hideInTable: true,
      valueType: 'text',
      fieldProps: {
        placeholder: '输入关键字在文档内检索分片',
      },
    },
    {
      title: '检索得分',
      dataIndex: 'score',
      width: 120,
      align: 'center',
      hideInSearch: true,
      hideInTable: !isSearching,
      render: (score) => renderScore(score as number),
    },
    {
      title: '字数',
      dataIndex: 'wordCount',
      width: 80,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '分片内容',
      dataIndex: 'content',
      hideInSearch: true,
      render: (text) => (
        <div style={{ 
          padding: '12px', 
          background: '#fafafa', 
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          position: 'relative'
        }}>
          <Typography.Paragraph 
            ellipsis={{ rows: 2, expandable: true, symbol: '展开' }} 
            style={{ 
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.6',
              paddingRight: '32px',
              color: 'rgba(0, 0, 0, 0.85)'
            }}
          >
            {text as string}
          </Typography.Paragraph>
          <Typography.Link 
            copyable={{ text: text as string }} 
            style={{ 
              position: 'absolute', 
              right: 8, 
              top: 12,
              color: 'rgba(0, 0, 0, 0.25)' 
            }} 
          />
        </div>
      ),
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
      <ProTable<API.ChunkVO, any>
        headerTitle="文档分片列表"
        tooltip="展示文档的分片内容及元数据，支持全文内容检索"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        request={async (params) => {
          if (!documentId) return { success: false };
          
          const { query } = params;
          if (query) {
            setIsSearching(true);
            const { data, code } = await searchChunks({
              query,
              documentId: documentId as any,
              topK: 20,
            });
            return {
              success: code === 0,
              data: data || [],
              total: data?.length || 0,
            };
          }
          
          setIsSearching(false);
          const { data, code } = await listChunkVoByPage({
            ...params,
            documentId: documentId as any,
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
            showSizeChanger: true,
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
      />
    </Drawer>
  );
};

export default DocumentChunkDrawer;
