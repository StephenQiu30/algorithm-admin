// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除知识库文档 同步删除文档记录及其在向量库、数据库关联的所有分片数据。 POST /ai/knowledge/document/delete */
export async function deleteDocument(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/ai/knowledge/document/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑知识库文档 编辑文档详情，仅本人或管理员可操作。 POST /ai/knowledge/document/edit */
export async function editDocument(
  body: API.KnowledgeDocumentEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/knowledge/document/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文档详情 根据 ID 获取单个知识库文档的详细视图信息。 GET /ai/knowledge/document/get/vo */
export async function getDocumentVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDocumentVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseKnowledgeDocumentVO>('/ai/knowledge/document/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取知识库文档 管理员视角分页查询所有文档记录及解析状态。 POST /ai/knowledge/document/list/page/vo */
export async function listDocumentVoByPage(
  body: API.KnowledgeDocumentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageKnowledgeDocumentVO>('/ai/knowledge/document/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新知识库文档(管理员) 管理员强制覆盖更新文档的基本元数据。 POST /ai/knowledge/document/update */
export async function updateDocument(
  body: API.KnowledgeDocumentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/knowledge/document/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传文档 上传知识库文档并触发异步解析。 POST /ai/knowledge/document/upload */
export async function uploadDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadDocumentParams,
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

  return request<API.BaseResponseLong>('/ai/knowledge/document/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
