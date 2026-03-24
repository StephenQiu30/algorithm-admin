// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除分片 管理员手动删除指定分片，通常用于清理异常数据。 POST /ai/chunk/delete */
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

/** 按文档删除分片 管理员批量删除特定文档的所有分片，用于数据清理。 POST /ai/chunk/delete/by/document */
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

/** 获取文档分片详情 管理员查看分片内容，用于调试和质量检查。 GET /ai/chunk/get/vo */
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

/** 分页获取文档分片 管理员查看分片列表，用于质量检查和调试。 POST /ai/chunk/list/page */
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
