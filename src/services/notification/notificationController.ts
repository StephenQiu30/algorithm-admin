// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建通知 管理员向特定目标发送通知 POST /notification/add */
export async function addNotification(
  body: API.NotificationAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListLong>('/notification/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除通知 批量删除选中的通知 POST /notification/batch/delete */
export async function batchDeleteNotification(
  body: API.NotificationBatchDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/notification/batch/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量标记已读 批量将选中通知标记为已读 POST /notification/batch/read */
export async function batchMarkNotificationRead(
  body: API.NotificationBatchReadRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/notification/batch/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除通知 删除指定通知，仅本人或管理员可操作 POST /notification/delete */
export async function deleteNotification(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/notification/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取通知详情 根据 ID 获取通知脱敏后的视图对象 GET /notification/get/vo */
export async function getNotificationVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNotificationVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseNotificationVO>('/notification/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取通知列表（用于同步） 获取系统通知的完整记录分页列表，仅限管理员权限。 POST /notification/list/page */
export async function listNotificationByPage(
  body: API.NotificationQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageNotification>('/notification/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取通知列表（封装类） 以脱敏视图形式分页获取通知列表，普通用户仅能查看自己的数据。 POST /notification/list/page/vo */
export async function listNotificationVoByPage(
  body: API.NotificationQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageNotificationVO>('/notification/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前用户的通知列表 分页检索当前登录用户收到的所有通知，包含关联的用户信息。 POST /notification/my/list/page/vo */
export async function listMyNotificationVoByPage(
  body: API.NotificationQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageNotificationVO>('/notification/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 标记已读 将指定通知标记为已读状态 POST /notification/read */
export async function markNotificationRead(
  body: API.NotificationReadRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/notification/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 全部标记已读 将当前用户的所有未读通知标记为已读 POST /notification/read/all */
export async function markAllNotificationRead(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/notification/read/all', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取未读通知数 获取当前用户未读通知的总数 GET /notification/unread/count */
export async function getNotificationUnreadCount(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/notification/unread/count', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新通知 更新指定通知，仅管理员可用 POST /notification/update */
export async function updateNotification(
  body: API.NotificationUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/notification/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
