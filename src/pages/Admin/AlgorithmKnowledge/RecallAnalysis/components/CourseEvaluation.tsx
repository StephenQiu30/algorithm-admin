import { ProCard } from '@ant-design/pro-components';
import { analyzeRecall } from '@/services/ai/ragController';
import { Alert, Button, Input, Table, Typography } from 'antd';
import React, { useState } from 'react';
type TestCase = {
  algorithmId: string;
  question: string;
  expectedVersion: string;
  expectedDocument: string;
  expectedAnswer: string;
};
type Row = TestCase & { hit: boolean; rank?: number; error?: string; actual: string };
/** A recall gate; answer correctness is reviewed separately against the reference answer. */
export default function CourseEvaluation({ knowledgeBaseId }: { knowledgeBaseId: string }) {
  const [text, setText] = useState(''),
    [rows, setRows] = useState<Row[]>([]),
    [loading, setLoading] = useState(false),
    [error, setError] = useState('');
  const run = async () => {
    let cases: TestCase[];
    try {
      const parsed: unknown = JSON.parse(text);
      if (
        !parsed ||
        typeof parsed !== 'object' ||
        !('cases' in parsed) ||
        !Array.isArray(parsed.cases) ||
        parsed.cases.length < 1 ||
        parsed.cases.length > 50
      )
        throw new Error('请粘贴含 1–50 条 cases 的课程测试集。');
      cases = parsed.cases.map((item) => {
        if (
          !item ||
          typeof item !== 'object' ||
          ![
            'bubble',
            'selection',
            'insertion',
            'merge',
            'quick',
            'heap',
            'shell',
            'radix',
          ].includes(item.algorithmId) ||
          typeof item.question !== 'string' ||
          !/^sorting-[a-f0-9]{12}$/.test(item.expectedVersion) ||
          typeof item.expectedDocument !== 'string' ||
          typeof item.expectedAnswer !== 'string'
        )
          throw new Error('测试项缺少算法、问题、版本、文档或参考答案。');
        return item;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : '测试集格式错误');
      return;
    }
    setLoading(true);
    setError('');
    const result: Row[] = [];
    for (const item of cases) {
      try {
        const body: API.RecallAnalysisRequest & { metadataFilters: Record<string, string> } = {
          question: item.question,
          knowledgeBaseId: knowledgeBaseId as unknown as number,
          topK: 5,
          enableRerank: true,
          metadataFilters: { version: item.expectedVersion, bizTag: `sorting:${item.algorithmId}` },
        };
        const response = await analyzeRecall(body);
        if (response.code !== 0) throw new Error(response.message || '召回失败');
        const hits = (response.data?.finalResults || []) as (API.RetrievalHitVO & {
          version?: string;
        })[];
        const rank = hits.findIndex(
          (hit) =>
            hit.documentName === item.expectedDocument && hit.version === item.expectedVersion,
        );
        result.push({
          ...item,
          hit: rank >= 0,
          rank: rank >= 0 ? rank + 1 : undefined,
          actual: hits
            .map((h) => `${h.documentName || '未标注文档'} / ${h.version || '未标注版本'}`)
            .join('；'),
        });
      } catch (e) {
        result.push({
          ...item,
          hit: false,
          actual: '',
          error: e instanceof Error ? e.message : '请求失败',
        });
      }
      setRows([...result]);
    }
    setLoading(false);
  };
  const hitRate = rows.length ? rows.filter((r) => r.hit).length / rows.length : 0;
  const mrr = rows.length
    ? rows.reduce((n, r) => n + (r.rank ? 1 / r.rank : 0), 0) / rows.length
    : 0;
  return (
    <ProCard bordered style={{ marginBottom: 24 }}>
      <Typography.Title level={4}>课程版本批量召回检查</Typography.Title>
      <Typography.Paragraph>
        粘贴前台 course-release/golden-questions.json。上传课程时须使用发布包中的文档名、version 和
        bizTag；测试按版本与算法过滤。
      </Typography.Paragraph>
      <Input.TextArea
        aria-label="课程测试集 JSON"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <Button style={{ marginTop: 12 }} loading={loading} disabled={!text.trim()} onClick={run}>
        运行测试集
      </Button>
      {error && <Alert type="error" message={error} style={{ marginTop: 12 }} />}
      {!!rows.length && (
        <>
          <Typography.Paragraph style={{ marginTop: 12 }}>
            已完成 {rows.length} 项 · 文档及版本命中率 {(hitRate * 100).toFixed(1)}% · MRR{' '}
            {mrr.toFixed(3)}
          </Typography.Paragraph>
          <Table<Row>
            size="small"
            rowKey={(row) => `${row.algorithmId}:${row.question}`}
            dataSource={rows}
            pagination={false}
            scroll={{ x: 800 }}
            columns={[
              { title: '问题', dataIndex: 'question' },
              {
                title: '召回',
                render: (_, row) =>
                  row.error || (row.hit ? `通过 · 第 ${row.rank} 位` : '未命中预期版本'),
              },
              { title: '实际来源', dataIndex: 'actual' },
              { title: '答案人工核对参考', dataIndex: 'expectedAnswer' },
            ]}
          />
        </>
      )}
      <Typography.Paragraph type="secondary" style={{ marginTop: 12 }}>
        此检查验证来源召回；参考答案仍需核对真实问答输出。版本命中不代表答案正确。
      </Typography.Paragraph>
    </ProCard>
  );
}
