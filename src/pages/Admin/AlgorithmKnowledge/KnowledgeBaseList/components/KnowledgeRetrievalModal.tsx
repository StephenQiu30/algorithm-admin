import { ProList, ProCard, ModalForm } from '@ant-design/pro-components';
import {
  Empty,
  Input,
  InputNumber,
  message,
  Space,
  Tag,
  Typography,
  Radio,
  Switch,
} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { searchChunks } from '@/services/ai/chunkController';
import { analyzeRecall } from '@/services/ai/ragController';
import { VectorSimilarityModeEnum } from '@/enums/VectorSimilarityModeEnum';

interface Props {
  knowledgeBaseId?: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 知识检索弹窗
 */
const KnowledgeRetrievalModal: React.FC<Props> = (props) => {
  const { knowledgeBaseId, visible, onCancel } = props;
  const [isDiagnose, setIsDiagnose] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('vector');
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [topK, setTopK] = useState<number>(5);
  const [similarityMode, setSimilarityMode] = useState<string>(VectorSimilarityModeEnum.KNN);
  const [results, setResults] = useState<API.SourceVO[] | API.RetrievalHitVO[]>([]);
  const [diagnoseResults, setDiagnoseResults] = useState<API.RecallAnalysisVO>();

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
      if (isDiagnose) {
        const res = await analyzeRecall({
          knowledgeBaseId: knowledgeBaseId as any,
          question: value,
          topK,
        });
        if (res.code === 0) {
          setDiagnoseResults(res.data);
          // 默认选中第一个有结果的 tab
          if (res.data?.vectorHits?.length) setActiveTab('vector');
          else if (res.data?.keywordHits?.length) setActiveTab('keyword');
          else if (res.data?.fusedHits?.length) setActiveTab('fused');
        } else {
          message.error(`诊断失败: ${res.message}`);
        }
      } else {
        const res = await searchChunks({
          knowledgeBaseId: knowledgeBaseId as any,
          query: value,
          topK,
        });
        if (res.code === 0) {
          setResults(res.data || []);
        } else {
          message.error(`检索失败: ${res.message}`);
        }
      }
    } catch (error: any) {
      message.error(`检索操作报错: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 渲染结果列表
   */
  const renderResultList = (dataSource: any[]) => (
    <ProList<any>
      loading={loading}
      dataSource={dataSource}
      rowKey={(item, index) => `${item.id || item.documentId}-${index}`}
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
                得分: {Number(item.score || item.vectorScore || 0).toFixed(4)}
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
        size: 'small',
      }}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="无检索结果"
            style={{ margin: '40px 0' }}
          />
        ),
      }}
    />
  );

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
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ color: 'rgba(0, 0, 0, 0.45)', marginBottom: 8 }}>
                检索内容
              </div>
              <Input.Search
                placeholder="输入问题，进行知识检索"
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
                召回数量
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
            {isDiagnose && (
              <div>
                <div style={{ color: 'rgba(0, 0, 0, 0.45)', marginBottom: 8 }}>
                  相似度模式
                </div>
                <Radio.Group
                  value={similarityMode}
                  onChange={(e) => setSimilarityMode(e.target.value)}
                  buttonStyle="solid"
                  size="large"
                >
                  <Radio.Button value={VectorSimilarityModeEnum.KNN}>kNN</Radio.Button>
                  <Radio.Button value={VectorSimilarityModeEnum.HYBRID}>Hybrid</Radio.Button>
                </Radio.Group>
              </div>
            )}
            <div style={{ width: 100 }}>
              <div style={{ color: 'rgba(0, 0, 0, 0.45)', marginBottom: 8 }}>
                诊断模式
              </div>
              <Switch
                checked={isDiagnose}
                onChange={(checked) => {
                  setIsDiagnose(checked);
                  setResults([]);
                  setDiagnoseResults(undefined);
                }}
                checkedChildren="开启"
                unCheckedChildren="关闭"
              />
            </div>
          </div>
        </ProCard>

        {isDiagnose ? (
          <ProCard
            tabs={{
              activeKey: activeTab,
              onChange: (key) => setActiveTab(key),
              items: [
                {
                  label: '向量检索',
                  key: 'vector',
                  children: renderResultList(diagnoseResults?.vectorHits || []),
                },
                {
                  label: '关键词检索',
                  key: 'keyword',
                  children: renderResultList(diagnoseResults?.keywordHits || []),
                },
                {
                  label: '综合分析',
                  key: 'fused',
                  children: renderResultList(diagnoseResults?.finalResults || []),
                },
              ],
            }}
          />
        ) : (
          renderResultList(results)
        )}
      </ProCard>
    </ModalForm>
  );
};

export default KnowledgeRetrievalModal;
