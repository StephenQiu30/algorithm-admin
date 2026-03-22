// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 点赞/取消点赞 点赞或取消点赞指定帖子 POST /post/thumb/add */
export async function doThumb(body: API.PostThumbRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseInteger>('/post/thumb/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /post/thumb/list/page */
export async function listThumbPostByPage(
  body: API.PostFavourQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/post/thumb/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /post/thumb/my/list/page */
export async function listMyThumbPostByPage(
  body: API.PostQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/post/thumb/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
