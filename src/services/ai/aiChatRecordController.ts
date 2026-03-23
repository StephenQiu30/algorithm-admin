// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除对话记录 POST /chat/record/delete */
export async function deleteAiChatRecord(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/chat/record/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员分页获取对话记录 POST /chat/record/list/page/vo */
export async function listAiChatRecordVoByPage(
  body: API.AiChatRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAiChatRecordVO>('/chat/record/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取我的对话历史 POST /chat/record/my/list/page/vo */
export async function listMyAiChatRecordVoByPage(
  body: API.AiChatRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAiChatRecordVO>('/chat/record/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
