// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 上传文档 上传文档到指定知识库，系统将自动进行文档解析、分片和向量化处理 POST /ai/doc/add */
export async function addDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addDocumentParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseLong>('/ai/doc/add', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 删除文档 POST /ai/doc/delete */
export async function deleteDocument(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/ai/doc/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文档详情 GET /ai/doc/get/vo */
export async function getDocumentVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDocumentVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDocumentVO>('/ai/doc/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取文档（管理员） POST /ai/doc/list/page */
export async function listDocumentByPage(
  body: API.DocumentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDocument>('/ai/doc/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取文档 分页获取文档脱敏信息列表 POST /ai/doc/list/page/vo */
export async function listDocumentVoByPage(
  body: API.DocumentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDocumentVO>('/ai/doc/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 我的文档列表 分页获取当前登录用户上传的文档列表 POST /ai/doc/my/list/page/vo */
export async function listMyDocumentVoByPage(
  body: API.DocumentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDocumentVO>('/ai/doc/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
