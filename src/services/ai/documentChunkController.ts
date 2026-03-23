// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建分片 手动新增一个文本分片（通常由后台或离线脚本使用）。 POST /ai/chunk/add */
export async function addDocumentChunk(
  body: API.DocumentChunkAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/ai/chunk/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除分片 手动删除指定的文本分片记录。 POST /ai/chunk/delete */
export async function deleteDocumentChunk(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/chunk/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 按文档删除分片 删除特定文档下的所有分片记录。 POST /ai/chunk/delete/by/document */
export async function deleteByDocumentId(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/chunk/delete/by/document', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文档分片详情 根据主键 ID 查询分片的内容及元数据。 GET /ai/chunk/get/vo */
export async function getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDocumentChunk>('/ai/chunk/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取文档分片 管理员视角分页检索所有分块，支持完整字段返回。 POST /ai/chunk/list/page */
export async function listDocumentChunkByPage(
  body: API.DocumentChunkQueryRequest,
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
