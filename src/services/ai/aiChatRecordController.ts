// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除对话记录 删除指定的 AI 对话记录，仅限管理员或记录所有者 POST /ai/record/delete */
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

/** 分页获取对话记录列表 (管理员) 获取完整字段的对话记录列表，仅管理员可用 POST /ai/record/list/page */
export async function listAiChatRecordByPage(
  body: API.AiChatRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAiChatRecord>('/ai/record/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取对话记录列表 (VO 版) 分页获取 AI 对话记录脱敏信息列表，主要由管理员用于管理后台 POST /ai/record/list/page/vo */
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

/** 分页获取我的对话记录 获取当前登录用户的历史 AI 对话记录，支持分页 POST /ai/record/my/list/page/vo */
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
