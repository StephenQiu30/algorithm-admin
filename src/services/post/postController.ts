// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建帖子 创建新帖子，初始状态为待审核 POST /post/add */
export async function addPost(body: API.PostAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/post/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除帖子 删除指定帖子，仅本人或管理员可操作 POST /post/delete */
export async function deletePost(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/post/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑帖子 编辑帖子信息，仅本人可操作 POST /post/edit */
export async function editPost(body: API.PostEditRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/post/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取帖子详情 根据ID获取帖子详细信息 GET /post/get/vo */
export async function getPostVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePostVO>('/post/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取帖子列表（用于同步） 获取完整字段的帖子列表，主要用于数据同步 POST /post/list/page */
export async function listPostByPage(body: API.PostQueryRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePagePostVO>('/post/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取帖子列表 分页获取已审核通过的帖子脱敏信息列表 POST /post/list/page/vo */
export async function listPostVoByPage(
  body: API.PostQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/post/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 我的帖子列表 分页获取当前登录用户创建的帖子列表 POST /post/my/list/page/vo */
export async function listMyPostVoByPage(
  body: API.PostQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/post/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审核帖子 人工审核帖子（通过或拒绝） POST /post/review */
export async function reviewPost(body: API.PostReviewRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/post/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员更新帖子 系统管理员全量更新指定帖子信息 POST /post/update */
export async function updatePost(body: API.PostUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/post/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
