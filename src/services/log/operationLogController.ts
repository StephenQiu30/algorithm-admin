// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建操作日志 记录用户操作日志 POST /log/operation/add */
export async function addOperationLog(
  body: API.OperationLogAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/log/operation/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除操作日志 删除指定操作日志（仅管理员） POST /log/operation/delete */
export async function deleteOperationLog(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/log/operation/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取操作日志列表 分页查询操作日志（仅管理员） POST /log/operation/list/page */
export async function listLogByPage(
  body: API.OperationLogQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageOperationLogVO>('/log/operation/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
