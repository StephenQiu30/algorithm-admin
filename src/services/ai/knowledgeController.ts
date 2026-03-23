// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建知识库 POST /knowledge/add */
export async function addKnowledgeBase(
  body: API.KnowledgeBaseAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/knowledge/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发起 RAG 知识库问答 POST /knowledge/chat */
export async function ragChat(body: API.RagChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseRagChatResponseVO>('/knowledge/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除知识库 POST /knowledge/delete */
export async function deleteKnowledgeBase(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/knowledge/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除知识库文档 POST /knowledge/document/delete */
export async function deleteDocument(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/knowledge/document/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传知识库文档 POST /knowledge/document/upload */
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

  return request<API.BaseResponseLong>('/knowledge/document/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 根据 id 获取知识库详情 GET /knowledge/get/vo */
export async function getKnowledgeBaseVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getKnowledgeBaseVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseKnowledgeBaseVO>('/knowledge/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取知识库列表 POST /knowledge/my/list/page/vo */
export async function listMyKnowledgeBaseVoByPage(
  body: API.KnowledgeBaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageKnowledgeBaseVO>('/knowledge/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员更新知识库 POST /knowledge/update */
export async function updateKnowledgeBase(
  body: API.KnowledgeBaseUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/knowledge/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
