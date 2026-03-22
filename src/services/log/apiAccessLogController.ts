// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建API访问日志 记录API访问日志 POST /log/access/add */
export async function addApiAccessLog(
  body: API.ApiAccessLogAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/log/access/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除API访问日志 删除指定API访问日志（仅管理员） POST /log/access/delete */
export async function deleteApiAccessLog(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/log/access/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取API访问日志列表 分页查询API访问日志（仅管理员） POST /log/access/list/page */
export async function listLogByPage2(
  body: API.ApiAccessLogQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageApiAccessLogVO>('/log/access/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
