// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建帖子评论 创建新的帖子评论 POST /post/comment/add */
export async function addPostComment(
  body: API.PostCommentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/post/comment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除帖子评论 删除指定帖子评论，仅本人或管理员可操作 POST /post/comment/delete */
export async function deletePostComment(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/post/comment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑帖子评论 编辑帖子评论信息，仅本人或管理员可操作 POST /post/comment/edit */
export async function editPostComment(
  body: API.PostCommentEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/post/comment/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取帖子评论详情 根据 ID 获取帖子评论详细信息 GET /post/comment/get/vo */
export async function getPostCommentVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostCommentVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePostCommentVO>('/post/comment/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取帖子评论列表（管理员） 分页获取帖子评论列表（仅管理员可用） POST /post/comment/list/page */
export async function listPostCommentByPage(
  body: API.PostCommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostCommentVO>('/post/comment/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取帖子评论列表 分页获取帖子评论详细信息列表 POST /post/comment/list/page/vo */
export async function listPostCommentVoByPage(
  body: API.PostCommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostCommentVO>('/post/comment/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 我的帖子评论列表 分页获取当前登录用户创建的帖子评论列表 POST /post/comment/my/list/page/vo */
export async function listMyPostCommentVoByPage(
  body: API.PostCommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostCommentVO>('/post/comment/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新帖子评论（管理员） 更新帖子评论信息（仅管理员可用） POST /post/comment/update */
export async function updatePostComment(
  body: API.PostCommentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/post/comment/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
