import { ProList, ProCard, ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-components';
import {
  Badge,
  Empty,
  Input,
  InputNumber,
  message,
  Space,
  Tag,
  Typography,
} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { search } from '@/services/ai/knowledgeBaseController';

interface Props {
  knowledgeBaseId?: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 知识检索弹窗
 * @param props
 * @constructor
 */
const KnowledgeRetrievalModal: React.FC<Props> = (props) => {
  const { knowledgeBaseId, visible, onCancel } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [topK, setTopK] = useState<number>(5);
  const [results, setResults] = useState<API.ChunkSourceVO[]>([]);

  /**
   * 执行检索
   */
  const handleSearch = async (value: string) => {
    if (!knowledgeBaseId) return;
    if (!value.trim()) {
      message.warning('请输入检索内容');
      return;
    }
    setLoading(true);
    try {
      const res = await search({
        knowledgeBaseId: knowledgeBaseId as any,
        query: value,
        topK,
      });
      if (res.code === 0) {
        setResults(res.data || []);
      } else {
        message.error(`检索失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`检索报错: ${error.message}`);
    } finally {
      setLoading(true);
      // Wait a bit to show loading state if it's too fast
      setTimeout(() => setLoading(false), 300);
    }
  };

  return (
    <ModalForm
      title="知识检索"
      open={visible}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
      modalProps={{
        destroyOnClose: true,
        width: 1000,
        styles: { body: { padding: '24px' } },
      }}
      submitter={{
        render: () => null,
      }}
    >
      <ProCard ghost direction="column" gutter={[0, 16]}>
        <ProCard bordered>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'rgba(0, 0, 0, 0.45)', marginBottom: 8 }}>
                检索内容
              </div>
              <Input.Search
                placeholder="输入问题，例如：什么是冒泡排序？"
                enterButton="开始检索"
                size="large"
                loading={loading}
                onSearch={handleSearch}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div style={{ width: 120 }}>
              <div style={{ color: 'rgba(0, 0, 0, 0.45)', marginBottom: 8 }}>
                Top K (1-20)
              </div>
              <InputNumber
                min={1}
                max={20}
                value={topK}
                onChange={(val) => setTopK(val || 5)}
                size="large"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </ProCard>

        <ProList<API.ChunkSourceVO>
          loading={loading}
          dataSource={results}
          rowKey="chunkId"
          ghost
          metas={{
            title: {
              render: (_, item) => (
                <Space size="middle" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Space>
                    <FileTextOutlined style={{ color: '#1890ff' }} />
                    <Typography.Text strong>{item.documentName}</Typography.Text>
                  </Space>
                  <Tag color="cyan">
                    匹配度: {( (item.score || 0) * 100 ).toFixed(2)}%
                  </Tag>
                </Space>
              ),
            },
            content: {
              render: (_, item) => (
                <ProCard
                  bordered
                  size="small"
                  hoverable
                  style={{ backgroundColor: '#fff', marginTop: 8 }}
                  bodyStyle={{ padding: 16 }}
                >
                  <Typography.Paragraph
                    copyable={{ text: item.content }}
                    ellipsis={{ rows: 5, expandable: true, symbol: '展开全文' }}
                    style={{ marginBottom: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' }}
                  >
                    {item.content}
                  </Typography.Paragraph>
                </ProCard>
              ),
            },
          }}
          pagination={{
            pageSize: 5,
          }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="输入检索内容，精准定位知识库片段"
                style={{ margin: '40px 0' }}
              />
            ),
          }}
        />
      </ProCard>
    </ModalForm>
  );
};

export default KnowledgeRetrievalModal;
