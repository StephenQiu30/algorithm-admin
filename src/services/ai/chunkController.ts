// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取分片详情 GET /ai/chunk/get/vo */
export async function getChunkVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChunkVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChunkVO>('/ai/chunk/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询文档分片（管理员） 获取完整字段的文档分片列表，仅限管理员 POST /ai/chunk/list/page */
export async function listChunkByPage(
  body: API.ChunkQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDocumentChunk>('/ai/chunk/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询文档分片 POST /ai/chunk/list/page/vo */
export async function listChunkVoByPage(
  body: API.ChunkQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChunkVO>('/ai/chunk/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 内容检索分片 基于关键词在指定知识库或文档中搜索相关分片 POST /ai/chunk/search */
export async function searchChunks(body: API.ChunkSearchRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseListChunkVO>('/ai/chunk/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
