// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** RAG流式问答 POST /ai/rag/ask/stream */
export async function askStream(body: API.RAGAskRequest, options?: { [key: string]: any }) {
  return request<string[]>('/ai/rag/ask/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取RAG历史 POST /ai/rag/history/list/page/vo */
export async function listRagHistoryVoByPage(
  body: API.RAGHistoryQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRAGHistoryVO>('/ai/rag/history/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 召回效果分析 POST /ai/rag/recall/analyze */
export async function analyzeRecall(
  body: API.RecallAnalysisRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseRecallAnalysisVO>('/ai/rag/recall/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量召回效果分析 POST /ai/rag/recall/batch/analyze */
export async function batchAnalyzeRecall(
  body: API.BatchRecallRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBatchRecallVO>('/ai/rag/recall/batch/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
