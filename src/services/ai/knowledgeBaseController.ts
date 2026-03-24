// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建知识库 新建一个知识库容器，用于存放相关的教学文档。 POST /ai/knowledge/add */
export async function addKnowledgeBase(
  body: API.KnowledgeBaseAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/ai/knowledge/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除知识库 删除指定的知识库信息（通常为管理员操作）。 POST /ai/knowledge/delete */
export async function deleteKnowledgeBase(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/knowledge/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库详情 根据主键 ID 查询知识库的详细信息。 GET /ai/knowledge/get/vo */
export async function getKnowledgeBaseVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getKnowledgeBaseVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseKnowledgeBaseVO>('/ai/knowledge/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员分页获取知识库列表 管理员视角分页检索系统内所有知识库。 POST /ai/knowledge/list/page/vo */
export async function listKnowledgeBaseVoByPage(
  body: API.KnowledgeBaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageKnowledgeBaseVO>('/ai/knowledge/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取我的知识库列表 获取当前登录用户创建的所有知识库列表。 POST /ai/knowledge/my/list/page/vo */
export async function listMyKnowledgeBaseVoByPage(
  body: API.KnowledgeBaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageKnowledgeBaseVO>('/ai/knowledge/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 检索知识库内容 基于向量相似度的语义搜索，返回匹配的文档片段。 POST /ai/knowledge/search */
export async function search(
  body: API.KnowledgeRetrievalRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChunkSourceVO>('/ai/knowledge/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 诊断双路召回 返回 kNN、BM25 和 RRF 融合三路结果，用于调参优化。 POST /ai/knowledge/search/diagnose */
export async function diagnoseSearch(
  body: API.KnowledgeRetrievalRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMapStringListChunkSourceVO>('/ai/knowledge/search/diagnose', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员更新知识库 系统管理员全量更新指定的知识库详情。 POST /ai/knowledge/update */
export async function updateKnowledgeBase(
  body: API.KnowledgeBaseUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/knowledge/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
