// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** AI 对话 (标准) 发送消息并等待 AI 返回完整回答 POST /ai/chat */
export async function doAiChat(body: API.AiChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseAiChatResponse>('/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** AI 对话 (流式) 发送消息并通过 SSE 获取 AI 逐字返回的内容 POST /ai/chat/stream */
export async function doStreamAiChat(body: API.AiChatRequest, options?: { [key: string]: any }) {
  return request<API.SseEmitter>('/ai/chat/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取支持的模型列表 获取系统当前支持的所有 AI 模型及其描述 GET /ai/models */
export async function listModels(options?: { [key: string]: any }) {
  return request<API.BaseResponseListAiModelVO>('/ai/models', {
    method: 'GET',
    ...(options || {}),
  });
}
