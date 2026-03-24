// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建知识库 POST /kb/add */
export async function addKnowledgeBase(
  body: API.KnowledgeBaseAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/kb/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除知识库 POST /kb/delete */
export async function deleteKnowledgeBase(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/kb/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑知识库 POST /kb/edit */
export async function editKnowledgeBase(
  body: API.KnowledgeBaseEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/kb/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库详情 GET /kb/get/vo */
export async function getKnowledgeBaseVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getKnowledgeBaseVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseKnowledgeBaseVO>('/kb/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取知识库 POST /kb/list/page/vo */
export async function listKnowledgeBaseVoByPage(
  body: API.KnowledgeBaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageKnowledgeBaseVO>('/kb/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取我的知识库 POST /kb/my/list/page/vo */
export async function listMyKnowledgeBaseVoByPage(
  body: API.KnowledgeBaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageKnowledgeBaseVO>('/kb/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员更新知识库 POST /kb/update */
export async function updateKnowledgeBase(
  body: API.KnowledgeBaseUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/kb/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
