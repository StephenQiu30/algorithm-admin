// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 收藏/取消收藏 收藏或取消收藏指定帖子 POST /post/favour/add */
export async function doFavour(body: API.PostFavourRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseInteger>('/post/favour/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /post/favour/list/page */
export async function listFavourPostByPage(
  body: API.PostFavourQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/post/favour/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /post/favour/my/list/page */
export async function listMyFavourPostByPage(
  body: API.PostQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/post/favour/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
