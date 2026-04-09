import {
  DashboardOutlined,
  EyeOutlined,
  FileSearchOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  RocketOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormTextArea,
  ProTable,
  StatisticCard,
} from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Alert, Badge, Button, Empty, message, Progress, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { analyzeRecall } from '@/services/ai/ragController';
import { getKnowledgeBaseVoById } from '@/services/ai/knowledgeBaseController';

const { Divider } = ProCard;

/**
 * 召回分析页面
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
        message.success('召回分析完成');
      } else {
        message.error(res.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 渲染检索得分
   */
  const renderScoreProgress = (
    score: number | undefined,
    label: string,
    color: string,
    tooltip?: string,
  ) => {
    if (score === undefined || score === null || score === 0) return null;

    const content = (
      <div style={{ width: '100%', marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <Typography.Text type="secondary" style={{ fontSize: 10, textTransform: 'uppercase' }}>
            {label}
          </Typography.Text>
          <Typography.Text strong style={{ fontSize: 12, color }}>
            {Number(score).toFixed(4)}
          </Typography.Text>
        </div>
        <Progress
          percent={Number(score) * 100}
          size={[100, 6]}
          showInfo={false}
          strokeColor={color}
          trailColor="#f0f0f0"
        />
      </div>
    );

    return tooltip ? (
      <Tooltip title={tooltip} key={label}>
        {content}
      </Tooltip>
    ) : (
      <div key={label}>{content}</div>
    );
  };

  const getColumns = (
    type?: 'vector' | 'keyword' | 'fused' | 'final',
  ): ProColumns<API.RetrievalHitVO>[] => [
    {
      title: '排序',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: '分片内容',
      dataIndex: 'content',
      render: (text) => (
        <div
          style={{
            padding: '16px',
            background: '#f8f9fb',
            border: '1px solid #eef0f2',
            borderRadius: '8px',
            position: 'relative',
            transition: 'all 0.3s',
          }}
          className="recall-chunk-content"
        >
          <Typography.Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: '展开全文' }}
            style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.8',
              color: 'rgba(0, 0, 0, 0.85)',
              paddingRight: '32px',
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
      title: '权重与相似度 (Weight & Similarity)',
      dataIndex: 'score',
      width: 200,
      render: (_, record) => (
        <div style={{ width: '100%' }}>
          {type === 'final' ? (
            <>
              {renderScoreProgress(record.score, 'Final', '#fa8c16', '最终权重综合评分')}
              {renderScoreProgress(record.similarityScore, 'Cosine', '#13c2c2', '向量余弦相似度')}
              {renderScoreProgress(record.fusionScore, 'RRF', '#722ed1', 'RR 融合分')}
            </>
          ) : (
            <>
              {type === 'vector' && renderScoreProgress(record.vectorScore, 'Vector', '#13c2c2', '向量检索分')}
              {type === 'keyword' && renderScoreProgress(record.keywordScore, 'BM25', '#2f54eb', 'ES 关键词关联分')}
              {type === 'fused' && renderScoreProgress(record.fusionScore, 'Fused', '#722ed1', '融合排名')}
            </>
          )}
        </div>
      ),
    },
    {
      title: '来源文档',
      dataIndex: 'documentName',
      width: 240,
      render: (text, record) => (
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Tooltip title={text || '未知文档'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                maxWidth: '100%',
                background: '#f0f5ff',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid #d6e4ff',
              }}
            >
              <FileSearchOutlined style={{ color: '#2f54eb', fontSize: 13 }} />
              <Typography.Text
                ellipsis
                style={{ color: '#1d39c4', fontSize: '13px', fontWeight: 500, flex: 1 }}
              >
                {text || '-'}
              </Typography.Text>
            </div>
          </Tooltip>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag color="default" style={{ margin: 0, borderRadius: '4px', fontSize: '11px' }}>
              Index #{record.chunkIndex ?? '?'}
            </Tag>
            {record.matchReason && (
              <Tag
                color={
                  record.matchReason.includes('vector')
                    ? 'cyan'
                    : record.matchReason.includes('keyword')
                    ? 'blue'
                    : 'gold'
                }
                style={{
                  margin: 0,
                  borderRadius: '4px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                }}
              >
                {record.matchReason}
              </Tag>
            )}
          </div>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '召回分析',
        subTitle: knowledgeBase?.name,
        onBack: () => history.back(),
        extra: [
          <Button
            key="history"
            icon={<HistoryOutlined />}
            onClick={() => history.push(`/admin/ai/record?knowledgeBaseId=${knowledgeBaseId}`)}
          >
            对话历史
          </Button>,
          <Button
            key="config"
            type="default"
            icon={<EyeOutlined />}
            onClick={() => history.push(`/admin/algorithm/knowledge/document/${knowledgeBaseId}`)}
          >
            管理
          </Button>,
        ],
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* 配置区 */}
        <ProCard bordered>
          <ProForm
            onFinish={handleAnalyze}
            layout="inline"
            submitter={{
              render: (_, dom) => <div style={{ marginLeft: 'auto' }}>{dom}</div>,
              searchConfig: { submitText: '开始深度诊断' },
            }}
          >
            <ProFormTextArea
              name="question"
              label="Query"
              placeholder="输入分析问题..."
              rules={[{ required: true }]}
              fieldProps={{
                autoSize: { minRows: 1, maxRows: 3 },
                style: { width: 400 },
              }}
            />
            <ProFormDigit
              name="topK"
              label="TopK"
              initialValue={5}
              min={1}
              max={50}
              fieldProps={{ style: { width: 70 } }}
            />
            <ProFormDigit
              name="similarityThreshold"
              label="阈值"
              initialValue={0.0}
              min={0}
              max={1}
              fieldProps={{ step: 0.1, style: { width: 70 } }}
            />
            <ProFormSwitch name="enableRerank" label="重排" initialValue={false} />
          </ProForm>
        </ProCard>

        {/* 结果区 */}
        <div style={{ minHeight: 400 }}>
          {loading ? (
            <ProCard bordered loading />
          ) : analysisResult ? (
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <ProCard.Group bordered direction="row">
                <StatisticCard
                  statistic={{
                    title: '诊断耗时',
                    value: analysisResult.costMs || 0,
                    suffix: 'ms',
                    icon: <RocketOutlined style={{ color: '#1677ff' }} />,
                  }}
                />
                <Divider type="vertical" />
                <StatisticCard
                  statistic={{
                    title: '平均召回相似度',
                    value: (analysisResult.avgSimilarity || 0) * 100,
                    precision: 2,
                    suffix: '%',
                    icon: <DashboardOutlined style={{ color: '#52c41a' }} />,
                  }}
                  chart={
                    <Progress
                      percent={(analysisResult.avgSimilarity || 0) * 100}
                      type="dashboard"
                      size={40}
                      gapDegree={120}
                      strokeColor="#52c41a"
                    />
                  }
                  chartPlacement="left"
                />
                <Divider type="vertical" />
                <StatisticCard
                  statistic={{
                    title: '最高相似度',
                    value: (analysisResult.maxSimilarity || 0) * 100,
                    precision: 2,
                    suffix: '%',
                    icon: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
                  }}
                />
                <Divider type="vertical" />
                <StatisticCard
                  statistic={{
                    title: '最终命中',
                    value: analysisResult.finalResults?.length || 0,
                    suffix: '分片',
                    icon: <FileSearchOutlined style={{ color: '#722ed1' }} />,
                  }}
                />
              </ProCard.Group>

              <ProCard
                title={
                  <Space>
                    <div style={{ width: 4, height: 16, background: '#1677ff', borderRadius: 2 }} />
                    <span style={{ fontWeight: 600 }}>全链路分析结果 (Ensemble)</span>
                    <Tooltip title="展示后端返回的原始融合召回结果">
                      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,0.45)', marginLeft: 4 }} />
                    </Tooltip>
                  </Space>
                }
                bordered
              >
                <ProTable<API.RetrievalHitVO>
                  columns={getColumns('final')}
                  dataSource={analysisResult.finalResults}
                  pagination={false}
                  search={false}
                  toolBarRender={false}
                  size="small"
                  rowKey={(r, i) => `${r.id}-${i}`}
                />
              </ProCard>

              <ProCard
                title="原始召回对照 (Original Recalls)"
                bordered
                tabs={{
                  type: 'line',
                  size: 'small',
                  items: [
                    {
                      label: (
                        <Space>
                          <span>语义召回</span>
                          <Badge
                            count={analysisResult.vectorHits?.length || 0}
                            color="#13c2c2"
                            style={{ boxShadow: 'none' }}
                          />
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
                          <span>关键词召回</span>
                          <Badge
                            count={analysisResult.keywordHits?.length || 0}
                            color="#2f54eb"
                            style={{ boxShadow: 'none' }}
                          />
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

              {analysisResult.rewriteQuery && (
                <Alert
                  message={
                    <Space>
                      <span style={{ fontWeight: 500 }}>查询优化建议 (Query Rewrite)</span>
                      <Badge status="processing" text="AI 优化" />
                    </Space>
                  }
                  description={
                    <div style={{ marginTop: 4 }}>
                      原始查询已通过 NLP 优化为：
                      <Typography.Text code style={{ marginLeft: 8 }}>
                        {analysisResult.rewriteQuery}
                      </Typography.Text>
                    </div>
                  }
                  type="info"
                  showIcon
                  icon={<RocketOutlined />}
                  style={{ borderRadius: '8px' }}
                />
              )}
            </Space>
          ) : (
            <ProCard bordered>
              <Empty
                image={<SearchOutlined style={{ fontSize: 64, color: '#f0f2f5' }} />}
                description={
                  <div style={{ color: 'rgba(0,0,0,0.45)' }}>
                    <h3>准备就绪</h3>
                    <p>提交 Query 来诊断当前知识库的召回表现</p>
                  </div>
                }
                style={{ padding: '64px 0' }}
              />
            </ProCard>
          )}
        </div>
      </Space>
    </PageContainer>
  );
};

export default RecallAnalysis;
