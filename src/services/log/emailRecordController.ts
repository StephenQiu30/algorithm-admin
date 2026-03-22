// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建邮件记录 记录邮件发送信息 POST /log/email/add */
export async function addEmailRecord(
  body: API.EmailRecordAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/log/email/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建邮件记录并返回 ID 记录邮件发送信息并返回记录 ID POST /log/email/add/id */
export async function addEmailRecordReturnId(
  body: API.EmailRecordAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/log/email/add/id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除邮件记录 删除指定邮件记录（仅管理员） POST /log/email/delete */
export async function deleteEmailRecord(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/log/email/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取邮件记录列表 分页查询邮件记录（仅管理员） POST /log/email/list/page */
export async function listRecordByPage1(
  body: API.EmailRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageEmailRecordVO>('/log/email/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新邮件记录状态 更新指定邮件记录的状态 POST /log/email/update/status */
export async function updateRecordStatus(
  body: API.EmailRecordUpdateStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/log/email/update/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
