import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Drawer, Tag, Typography, Tooltip, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { listChunkVoByPage, searchChunks } from '@/services/ai/chunkController';

interface Props {
  documentId?: any;
  visible: boolean;
  onClose: () => void;
}

/**
 * 文档分片详情抽屉
 */
const DocumentChunkDrawer: React.FC<Props> = (props) => {
  const { documentId, visible, onClose } = props;
  const actionRef = useRef<ActionType>();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  /**
   * 渲染检索分数
   */
  const renderScore = (score: any) => {
    if (score === undefined || score === null) return '-';
    
    // 强制转换为数字以防后端返回字符串
    const numScore = Number(score);
    if (isNaN(numScore)) return score;

    const isSmall = numScore < 0.1;
    const tag = (
      <Tag 
        color={isSmall ? 'purple' : 'orange'} 
        style={{ margin: 0, borderRadius: '4px' }}
      >
        {isSmall ? '融合' : '分数'}: {numScore.toFixed(4)}
      </Tag>
    );

    return isSmall ? (
      <Tooltip title="分值通常代表该结果是通过 RRF (Reciprocal Rank Fusion) 算法计算出的融合排名分，分值越小越靠前。">
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
      render: (text) => (
        <Tag color="processing" style={{ border: 'none', borderRadius: '4px' }}>
          #{text}
        </Tag>
      ),
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
      render: (score) => renderScore(score),
    },
    {
      title: '字数',
      dataIndex: 'wordCount',
      width: 80,
      align: 'center',
      hideInSearch: true,
      render: (count) => <Typography.Text type="secondary">{count}</Typography.Text>,
    },
    {
      title: '分片内容',
      dataIndex: 'content',
      hideInSearch: true,
      render: (text) => (
        <div style={{ 
          padding: '16px', 
          background: '#f8f9fb', 
          border: '1px solid #eef0f2',
          borderRadius: '8px',
          position: 'relative',
          transition: 'all 0.3s'
        }}
        className="chunk-content-wrapper"
        >
          <Typography.Paragraph 
            ellipsis={{ rows: 3, expandable: true, symbol: '展开全文' }} 
            style={{ 
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.8',
              paddingRight: '32px',
              color: 'rgba(0, 0, 0, 0.85)',
              whiteSpace: 'pre-wrap'
            }}
          >
            {text as string}
          </Typography.Paragraph>
          <Typography.Link 
            copyable={{ text: text as string }} 
            style={{ 
              position: 'absolute', 
              right: 12, 
              top: 16,
              color: 'rgba(0, 0, 0, 0.45)' 
            }} 
          />
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 180,
      hideInSearch: true,
      render: (dom) => <Typography.Text type="secondary" style={{ fontSize: '13px' }}>{dom}</Typography.Text>,
    },
  ];

  return (
    <Drawer
      title={
        <Space>
          <span>文档分片列表</span>
          {documentId && <Tag color="blue">ID: {documentId}</Tag>}
        </Space>
      }
      width={1100}
      open={visible}
      onClose={onClose}
      destroyOnClose
      bodyStyle={{ padding: '0 24px 24px' }}
    >
      <ProTable<API.ChunkVO, any>
        headerTitle={null}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
          searchText: '检索',
          resetText: '重置',
        }}
        request={async (params) => {
          if (!documentId) return { success: false };
          
          const { query } = params;
          if (query) {
            setIsSearching(true);
            const { data, code } = await searchChunks({
              query,
              documentId: documentId as any,
              topK: 50,
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
            showTotal: (total) => `共 ${total} 个分片`,
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
        ghost
      />
      <style>{`
        .chunk-content-wrapper:hover {
          border-color: #1677ff !important;
          background: #fff !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </Drawer>
  );
};

export default DocumentChunkDrawer;
