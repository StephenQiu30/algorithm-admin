// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 上传文档 POST /doc/add */
export async function addDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addDocumentParams,
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/doc/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除文档 POST /doc/delete */
export async function deleteDocument(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/doc/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文档详情 GET /doc/get/vo */
export async function getDocumentVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDocumentVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDocumentVO>('/doc/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取文档 POST /doc/list/page/vo */
export async function listDocumentVoByPage(
  body: API.DocumentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDocumentVO>('/doc/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取我的文档 POST /doc/my/list/page/vo */
export async function listMyDocumentVoByPage(
  body: API.DocumentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDocumentVO>('/doc/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
