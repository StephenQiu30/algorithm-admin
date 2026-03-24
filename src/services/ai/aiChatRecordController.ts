// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发起 RAG 问答 核心接口：基于指定知识库执行检索增强生成的同步问答。 POST /ai/record/chat */
export async function ragChat(body: API.RagChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseRagChatResponseVO>('/ai/record/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除对话记录 删除指定的对话记录，仅本人或管理员可操作。 POST /ai/record/delete */
export async function deleteAiChatRecord(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/ai/record/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取对话记录详情 根据 ID 获取单条对话记录的详细信息。 GET /ai/record/get/vo */
export async function getAiChatRecordVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAiChatRecordVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAiChatRecordVO>('/ai/record/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员分页获取对话记录 管理员视角查看所有用户的对话记录。 POST /ai/record/list/page/vo */
export async function listAiChatRecordVoByPage(
  body: API.AiChatRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAiChatRecordVO>('/ai/record/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取我的对话历史 获取当前登录用户的历史对话列表。 POST /ai/record/my/list/page/vo */
export async function listMyAiChatRecordVoByPage(
  body: API.AiChatRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAiChatRecordVO>('/ai/record/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 流式 RAG 问答 基于 SSE 协议的检索增强生成流式输出。 POST /ai/record/stream */
export async function streamRagChat(body: API.RagChatRequest, options?: { [key: string]: any }) {
  return request<API.RagChatResponseVO[]>('/ai/record/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
