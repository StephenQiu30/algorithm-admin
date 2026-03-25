import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSwitch,
  ProFormTextArea,
  ProList,
} from '@ant-design/pro-components';
import { Button, Empty, Form, message, Space, Tag, Tooltip, Typography } from 'antd';
import { FileTextOutlined, InfoCircleOutlined, RocketOutlined, SearchOutlined, } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { history, useParams } from '@umijs/max';
import { searchChunks } from '@/services/ai/chunkController';
import { analyzeRecall } from '@/services/ai/ragController';
import { getKnowledgeBaseVoById } from '@/services/ai/knowledgeBaseController';
import { VectorSimilarityModeEnum } from '@/enums/VectorSimilarityModeEnum';

/**
 * 知识检索页面 (Full Page Version)
 */
const KnowledgeRetrievalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const knowledgeBaseId = id as any;
  const [form] = Form.useForm();

  const [knowledgeBase, setKnowledgeBase] = useState<API.KnowledgeBaseVO>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDiagnose, setIsDiagnose] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('vector');
  const [results, setResults] = useState<API.SourceVO[] | API.RetrievalHitVO[]>([]);
  const [diagnoseResults, setDiagnoseResults] = useState<API.RecallAnalysisVO>();

  /**
   * 获取知识库详情
   */
  useEffect(() => {
    if (knowledgeBaseId) {
      getKnowledgeBaseVoById({ id: knowledgeBaseId }).then((res) => {
        if (res.code === 0) setKnowledgeBase(res.data);
      });
    }
  }, [knowledgeBaseId]);

  /**
   * 执行检索
   */
  const handleSearch = async (values: any) => {
    if (!knowledgeBaseId) return;
    const { query, topK, isDiagnose: diagnoseMode } = values;

    setLoading(true);
    try {
      if (diagnoseMode) {
        const res = await analyzeRecall({
          knowledgeBaseId: knowledgeBaseId as any,
          question: query,
          topK,
        });
        if (res.code === 0) {
          setDiagnoseResults(res.data);
          if (res.data?.vectorHits?.length) setActiveTab('vector');
          else if (res.data?.keywordHits?.length) setActiveTab('keyword');
          else if (res.data?.fusedHits?.length) setActiveTab('fused');
          message.success('诊断分析完成');
        } else {
          message.error(`诊断失败: ${res.message}`);
        }
      } else {
        const res = await searchChunks({
          knowledgeBaseId: knowledgeBaseId as any,
          query,
          topK,
        });
        if (res.code === 0) {
          setResults(res.data || []);
          message.success(`成功检索到 ${res.data?.length || 0} 条结果`);
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
   * 渲染得分标签
   */
  const renderScoreTag = (score: number | undefined, label: string, color: string) => {
    if (score === undefined || score === null || score === 0) return null;
    return (
      <Tag
        color={color}
        style={{
          margin: 0,
          borderRadius: '4px',
          fontWeight: 600,
          border: 'none',
          padding: '0 8px',
          fontSize: '11px',
        }}
      >
        <span style={{ opacity: 0.8, fontSize: '9px', marginRight: 4, textTransform: 'uppercase' }}>
          {label}
        </span>
        {Number(score).toFixed(4)}
      </Tag>
    );
  };

  /**
   * 渲染结果列表
   */
  const renderResultList = (dataSource: any[]) => (
    <ProList<any>
      loading={loading}
      dataSource={dataSource}
      itemLayout="vertical"
      rowKey={(item, index) => `${item.id || item.documentId}-${index}`}
      metas={{
        title: {
          render: (_, item) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 16px',
                background: '#fafafa',
                borderRadius: '8px 8px 0 0',
                border: '1px solid #f0f0f0',
                borderBottom: 'none',
              }}
            >
              <Space>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: '#e6f4ff',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FileTextOutlined style={{ color: '#1677ff', fontSize: 14 }} />
                </div>
                <Typography.Text strong style={{ fontSize: '15px' }}>
                  {item.documentName || '未知文档'}
                </Typography.Text>
                <Tag color="blue" style={{ borderRadius: '4px', margin: 0, fontSize: '11px' }}>
                  Index #{item.chunkIndex ?? 0}
                </Tag>
              </Space>
              <Space size={4}>
                {renderScoreTag(item.score, 'Final', '#fa8c16')}
                {renderScoreTag(item.vectorScore, 'Vec', '#13c2c2')}
                {renderScoreTag(item.keywordScore, 'BM25', '#2f54eb')}
                {renderScoreTag(item.fusionScore, 'RRF', '#722ed1')}
              </Space>
            </div>
          ),
        },
        description: {
          render: (_, item) => (
            <div
              style={{
                padding: '24px',
                background: '#fff',
                border: '1px solid #f0f0f0',
                borderRadius: '0 0 8px 8px',
                marginBottom: 20,
                boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                position: 'relative',
              }}
            >
              <Typography.Paragraph
                copyable={{ text: item.content }}
                ellipsis={{ rows: 6, expandable: true, symbol: '展开全文' }}
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: 'rgba(0, 0, 0, 0.85)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {item.content}
              </Typography.Paragraph>
              {item.matchReason && (
                <div style={{ marginTop: 16 }}>
                  <Tag color="orange" style={{ fontSize: '11px', borderRadius: '4px' }}>
                    召回原因: {item.matchReason}
                  </Tag>
                </div>
              )}
            </div>
          ),
        },
      }}
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
      }}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无检索结果，请尝试调整检索词或 TopK"
          />
        ),
      }}
    />
  );

  return (
    <PageContainer
      header={{
        title: '知识检索',
        subTitle: knowledgeBase?.name,
        onBack: () => history.back(),
        extra: [
          <Button
            key="analysis"
            type="default"
            onClick={() =>
              history.push(`/admin/algorithm/knowledge/recall-analysis/${knowledgeBaseId}`)
            }
          >
            召回诊断
          </Button>,
        ],
      }}
    >
      <ProCard ghost direction="column" gutter={[0, 24]}>
        {/* 配置区 */}
        <ProCard bordered>
          <ProForm
            form={form}
            onFinish={handleSearch}
            layout="inline"
            submitter={{
              render: (_, dom) => <div style={{ marginLeft: 'auto' }}>{dom}</div>,
              searchConfig: { submitText: '执行检索' },
              submitButtonProps: {
                icon: <SearchOutlined />,
                loading,
              },
              resetButtonProps: {
                style: { marginLeft: 8 },
              },
            }}
          >
            <ProFormTextArea
              name="query"
              label="检索内容"
              placeholder="输入问题或关键词..."
              rules={[{ required: true }]}
              fieldProps={{
                autoSize: { minRows: 1, maxRows: 4 },
                style: { width: 450 },
              }}
            />
            <ProFormDigit
              name="topK"
              label="召回数量"
              initialValue={5}
              min={1}
              max={50}
              fieldProps={{ style: { width: 80 } }}
            />
            <ProFormSwitch
              name="isDiagnose"
              label="诊断模式"
              fieldProps={{
                onChange: (checked) => {
                  setIsDiagnose(checked);
                  setResults([]);
                  setDiagnoseResults(undefined);
                },
              }}
            />
            {isDiagnose && (
              <ProFormRadio.Group
                name="similarityMode"
                label="算法模式"
                initialValue={VectorSimilarityModeEnum.KNN}
                options={[
                  { label: '向量 (kNN)', value: VectorSimilarityModeEnum.KNN },
                  { label: '混合 (Hybrid)', value: VectorSimilarityModeEnum.HYBRID },
                ]}
                radioType="button"
              />
            )}
          </ProForm>
        </ProCard>

        {/* 结果区 */}
        <ProCard
          title={
            <Space>
              <RocketOutlined style={{ color: '#fa8c16' }} />
              <span style={{ fontWeight: 600 }}>检索结果 (Hits)</span>
              <Tooltip title="基于当前配置召回的最相关知识片段">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,0.45)', marginLeft: 4 }} />
              </Tooltip>
            </Space>
          }
          bordered
          bodyStyle={{ padding: '0 32px 32px' }}
        >
          {isDiagnose ? (
            <ProCard
              tabs={{
                activeKey: activeTab,
                type: 'line',
                onChange: (key) => setActiveTab(key),
                items: [
                  {
                    label: (
                      <Space>
                        向量召回
                        <Tag style={{ borderRadius: 10 }}>
                          {diagnoseResults?.vectorHits?.length || 0}
                        </Tag>
                      </Space>
                    ),
                    key: 'vector',
                    children: renderResultList(diagnoseResults?.vectorHits || []),
                  },
                  {
                    label: (
                      <Space>
                        关键词召回
                        <Tag style={{ borderRadius: 10 }}>
                          {diagnoseResults?.keywordHits?.length || 0}
                        </Tag>
                      </Space>
                    ),
                    key: 'keyword',
                    children: renderResultList(diagnoseResults?.keywordHits || []),
                  },
                  {
                    label: (
                      <Space>
                        全链路融合
                        <Tag color="orange" style={{ borderRadius: 10 }}>
                          {diagnoseResults?.finalResults?.length || 0}
                        </Tag>
                      </Space>
                    ),
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
      </ProCard>
    </PageContainer>
  );
};

export default KnowledgeRetrievalPage;
