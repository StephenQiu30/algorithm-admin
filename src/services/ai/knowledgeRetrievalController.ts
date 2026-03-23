// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 检索知识库内容 获取特定查询在知识库中的相似切片和评分 POST /retrieval/search */
export async function search(
  body: API.KnowledgeRetrievalRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChunkSourceVO>('/retrieval/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
