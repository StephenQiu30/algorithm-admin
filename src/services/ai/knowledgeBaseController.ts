// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建知识库 创建新的知识库，用于组织和管理文档 POST /ai/kb/add */
export async function addKnowledgeBase(
  body: API.KnowledgeBaseAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/ai/kb/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除知识库 删除指定知识库，仅本人或管理员可操作 POST /ai/kb/delete */
export async function deleteKnowledgeBase(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/kb/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑知识库 POST /ai/kb/edit */
export async function editKnowledgeBase(
  body: API.KnowledgeBaseEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/kb/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库详情 根据ID获取知识库的详细信息 GET /ai/kb/get/vo */
export async function getKnowledgeBaseVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getKnowledgeBaseVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseKnowledgeBaseVO>('/ai/kb/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取知识库（管理员） POST /ai/kb/list/page */
export async function listKnowledgeBaseByPage(
  body: API.KnowledgeBaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageKnowledgeBase>('/ai/kb/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取知识库 分页获取知识库脱敏信息列表 POST /ai/kb/list/page/vo */
export async function listKnowledgeBaseVoByPage(
  body: API.KnowledgeBaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageKnowledgeBaseVO>('/ai/kb/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取我的知识库 POST /ai/kb/my/list/page/vo */
export async function listMyKnowledgeBaseVoByPage(
  body: API.KnowledgeBaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageKnowledgeBaseVO>('/ai/kb/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员更新知识库 POST /ai/kb/update */
export async function updateKnowledgeBase(
  body: API.KnowledgeBaseUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/kb/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
