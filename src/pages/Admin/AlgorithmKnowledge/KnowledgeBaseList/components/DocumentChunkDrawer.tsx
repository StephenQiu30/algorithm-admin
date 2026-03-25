import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Drawer, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { listChunkVoByPage, searchChunks } from '@/services/ai/chunkController';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  chunkCard: {
    padding: '16px',
    background: '#f8f9fb',
    border: '1px solid #eef0f2',
    borderRadius: '12px',
    position: 'relative',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: token.colorPrimary,
      background: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
  },
  chunkIndex: {
    fontSize: '11px',
    fontWeight: 600,
    color: token.colorTextSecondary,
    background: '#f0f2f5',
    padding: '2px 8px',
    borderRadius: '4px',
    border: 'none',
  },
}));

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
  const { styles } = useStyles();
  const actionRef = useRef<ActionType>();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  /**
   * 渲染检索分数
   */
  const renderScore = (score: any) => {
    if (score === undefined || score === null) return '-';

    const numScore = Number(score);
    if (isNaN(numScore)) return score;

    const isRRF = numScore < 0.1;
    return (
      <Tooltip
        title={isRRF ? 'RRF (Reciprocal Rank Fusion) 融合排名分，值越小越靠前' : '检索相似度得分'}
      >
        <Tag
          color={isRRF ? 'purple' : 'orange'}
          style={{
            margin: 0,
            borderRadius: '4px',
            fontWeight: 600,
            border: 'none',
            padding: '0 8px',
          }}
        >
          {isRRF ? 'RRF' : 'Score'}: {numScore.toFixed(4)}
        </Tag>
      </Tooltip>
    );
  };

  const columns: ProColumns<API.ChunkVO>[] = [
    {
      title: '排序',
      dataIndex: 'chunkIndex',
      width: 90,
      align: 'center',
      hideInSearch: true,
      render: (text) => <span className={styles.chunkIndex}>#{text}</span>,
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
      title: '相关度分',
      dataIndex: 'score',
      width: 140,
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
      render: (count) => (
        <Typography.Text type="secondary" style={{ fontSize: '13px' }}>
          {count}
        </Typography.Text>
      ),
    },
    {
      title: '分片内容',
      dataIndex: 'content',
      hideInSearch: true,
      render: (text) => (
        <div className={styles.chunkCard}>
          <Typography.Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: '展开全文' }}
            style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.8',
              paddingRight: '32px',
              color: 'rgba(0, 0, 0, 0.85)',
              whiteSpace: 'pre-wrap',
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
              color: 'rgba(0, 0, 0, 0.25)',
            }}
          />
        </div>
      ),
    },
    {
      title: '保存日期',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 170,
      hideInSearch: true,
      render: (dom) => (
        <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
          {dom}
        </Typography.Text>
      ),
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
    </Drawer>
  );
};

export default DocumentChunkDrawer;
