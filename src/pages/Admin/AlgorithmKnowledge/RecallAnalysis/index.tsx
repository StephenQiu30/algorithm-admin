import {
  FileSearchOutlined,
  HistoryOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormTextArea,
  ProTable,
  ProColumns,
  ProDescriptions,
} from '@ant-design/pro-components';
import { useParams, history } from '@umijs/max';
import { Badge, message, Space, Tag, Typography, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { analyzeRecall } from '@/services/ai/ragController';
import { getKnowledgeBaseVoById } from '@/services/ai/knowledgeBaseController';

/**
 * 召回分析页面
 * @constructor
 */
const RecallAnalysis: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const knowledgeBaseId = id as any;
  const [knowledgeBase, setKnowledgeBase] = useState<API.KnowledgeBaseVO>();
  const [loading, setLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<API.RecallAnalysisVO>();

  useEffect(() => {
    if (knowledgeBaseId) {
      getKnowledgeBaseVoById({ id: knowledgeBaseId }).then((res) => {
        if (res.code === 0) setKnowledgeBase(res.data);
      });
    }
  }, [knowledgeBaseId]);

  const handleAnalyze = async (values: any) => {
    setLoading(true);
    try {
      const res = await analyzeRecall({
        ...values,
        knowledgeBaseId,
      });
      if (res.code === 0) {
        setAnalysisResult(res.data);
        message.success('分析完成');
      } else {
        message.error(res.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderScore = (record: API.RetrievalHitVO, type?: 'vector' | 'keyword' | 'fused' | 'final') => {
    let score = 0;
    let label = '';
    let color = 'blue';
    let tooltip = '';

    if (type === 'vector') {
      score = record.vectorScore ?? 0;
      label = '向量';
      color = 'cyan';
    } else if (type === 'keyword') {
      score = record.keywordScore ?? 0;
      label = '关键词';
      color = 'geekblue';
    } else if (type === 'fused') {
      score = record.fusionScore ?? record.score ?? 0;
      label = '融合';
      color = 'purple';
      tooltip = '采用 RRF (Reciprocal Rank Fusion) 算法融合的结果。分值范围通常较小 (如 0.01~0.02)，代表跨路检索的综合排名。';
    } else {
      score = record.score ?? record.fusionScore ?? 0;
      label = record.matchReason?.includes('rerank') ? '重排' : '融合';
      color = record.matchReason?.includes('rerank') ? 'magenta' : 'purple';
      if (label === '融合') {
        tooltip = '采用 RRF 算法融合的结果。';
      }
    }

    const tag = (
      <Tag color={color} style={{ margin: 0 }}>
        {label}: {Number(score).toFixed(4)}
      </Tag>
    );

    return tooltip ? (
      <Typography.Text title={tooltip} style={{ cursor: 'help' }}>
        {tag}
      </Typography.Text>
    ) : tag;
  };

  const getColumns = (type?: 'vector' | 'keyword' | 'fused' | 'final'): ProColumns<API.RetrievalHitVO>[] => [
    {
      title: '得分',
      dataIndex: 'score',
      width: 140,
      align: 'center',
      render: (_, record) => renderScore(record, type),
    },
    {
      title: '分片内容',
      dataIndex: 'content',
      render: (text) => (
        <div style={{ 
          padding: '12px', 
          background: '#fafafa', 
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          position: 'relative'
        }}>
          <Typography.Paragraph 
            ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}
            style={{ 
              margin: 0, 
              fontSize: '14px', 
              lineHeight: '1.6',
              color: 'rgba(0, 0, 0, 0.85)',
              paddingRight: '24px'
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
      title: '来源详情',
      dataIndex: 'documentName',
      width: 200,
      render: (text, record) => (
        <Space direction="vertical" size={2}>
          <Tag color="cyan" style={{ border: 'none', margin: 0 }}>{text}</Tag>
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            第 {record.chunkIndex} 个分片
          </Typography.Text>
          {record.matchReason && !record.matchReason.includes('rerank') && (
            <Tag color="orange" style={{ fontSize: '11px', marginTop: 4, borderRadius: '4px' }}>
              {record.matchReason}
            </Tag>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: `召回分析 - ${knowledgeBase?.name || '...'}`,
        onBack: () => history.back(),
        extra: [
          <Button
            key="history"
            icon={<HistoryOutlined />}
            onClick={() => history.push(`/admin/ai/record?knowledgeBaseId=${knowledgeBaseId}`)}
          >
            对话历史
          </Button>
        ]
      }}
    >
      <ProCard gutter={[16, 16]} ghost>
        <ProCard colSpan={{ xs: 24, sm: 24, md: 8, lg: 8, xl: 6 }} bordered>
          <ProForm
            onFinish={handleAnalyze}
            submitter={{
              searchConfig: { submitText: '提交分析' },
              render: (_, dom) => <div style={{ width: '100%' }}>{dom}</div>,
            }}
          >
            <ProFormTextArea
              name="question"
              label="测试 Query"
              placeholder="输入查询内容"
              rules={[{ required: true }]}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <ProFormDigit name="topK" label="TopK" initialValue={5} min={1} max={50} />
              <ProFormDigit name="similarityThreshold" label="阈值" initialValue={0.0} min={0} max={1} fieldProps={{ step: 0.1 }} />
            </div>
            <ProFormSwitch name="enableRerank" label="启用重排" initialValue={false} />
          </ProForm>
        </ProCard>

        <ProCard colSpan={{ xs: 24, sm: 24, md: 16, lg: 16, xl: 18 }} loading={loading} bordered>
          {analysisResult ? (
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <ProCard gutter={16} ghost>
                <ProCard bordered colSpan={12} style={{ height: '100%' }}>
                  <Typography.Text type="secondary" style={{ fontSize: '14px' }}>分析耗时</Typography.Text>
                  <div style={{ marginTop: 8 }}>
                    <Typography.Title level={2} style={{ margin: 0, fontWeight: 600 }}>
                      {analysisResult.costMs || 0} <span style={{ fontSize: '16px', fontWeight: 'normal' }}>ms</span>
                    </Typography.Title>
                  </div>
                </ProCard>
                <ProCard bordered colSpan={12} style={{ height: '100%' }}>
                  <Typography.Text type="secondary" style={{ fontSize: '14px' }}>总召回条数</Typography.Text>
                  <div style={{ marginTop: 8 }}>
                    <Typography.Title level={2} style={{ margin: 0, fontWeight: 600 }}>
                      {analysisResult.finalResults?.length || 0} <span style={{ fontSize: '16px', fontWeight: 'normal' }}>条</span>
                    </Typography.Title>
                  </div>
                </ProCard>
              </ProCard>
              
              <ProTable<API.RetrievalHitVO>
                headerTitle="召回链路融合结果"
                tooltip="展示经过混合检索和分数融合后的最终排名结果"
                columns={getColumns('final')}
                dataSource={analysisResult.finalResults}
                pagination={false}
                search={false}
                toolBarRender={false}
                size="small"
                rowKey={(r, i) => `${r.id}-${i}`}
                style={{
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              />

              <ProCard
                title="原始召回策略详情"
                tabs={{
                  type: 'line',
                  items: [
                    {
                      label: (
                        <Space>
                          <Typography.Text>向量检索</Typography.Text>
                          <Badge count={analysisResult.vectorHits?.length || 0} showZero color="#13c2c2" />
                        </Space>
                      ),
                      key: 'vector',
                      children: (
                        <ProTable<API.RetrievalHitVO>
                          columns={getColumns('vector')}
                          dataSource={analysisResult.vectorHits}
                          pagination={false}
                          search={false}
                          size="small"
                          toolBarRender={false}
                          rowKey={(r, i) => `v-${r.id}-${i}`}
                        />
                      ),
                    },
                    {
                      label: (
                        <Space>
                          <Typography.Text>关键词检索</Typography.Text>
                          <Badge count={analysisResult.keywordHits?.length || 0} showZero color="#2f54eb" />
                        </Space>
                      ),
                      key: 'keyword',
                      children: (
                        <ProTable<API.RetrievalHitVO>
                          columns={getColumns('keyword')}
                          dataSource={analysisResult.keywordHits}
                          pagination={false}
                          search={false}
                          size="small"
                          toolBarRender={false}
                          rowKey={(r, i) => `k-${r.id}-${i}`}
                        />
                      ),
                    },
                  ],
                }}
              />
            </Space>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '120px 0', 
              background: '#fcfcfc',
              borderRadius: '8px',
              border: '1px dashed #d9d9d9'
            }}>
              <SearchOutlined style={{ fontSize: 48, color: '#bfbfbf', marginBottom: 16 }} />
              <Typography.Title level={5} style={{ color: '#8c8c8c', fontWeight: 400 }}>
                暂无分析结果
              </Typography.Title>
              <Typography.Text type="secondary">
                在左侧面板输入查询内容并提交，系统将执行多路检索策略并展示召回链路分析数据
              </Typography.Text>
            </div>
          )}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default RecallAnalysis;
