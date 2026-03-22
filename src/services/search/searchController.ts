// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 聚合搜索查询 POST /search/all */
export async function doSearchAll(body: API.SearchRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseSearchVOObject>('/search/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量同步帖子到 ES POST /search/post/batch/upsert */
export async function batchUpsertPost(body: API.PostEsDTO[], options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/search/post/batch/upsert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页搜索帖子（从 ES 查询） POST /search/post/page */
export async function searchPostByPage(
  body: API.PostQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePage>('/search/post/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量同步用户到 ES POST /search/user/batch/upsert */
export async function batchUpsertUser(body: API.UserEsDTO[], options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/search/user/batch/upsert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页搜索用户（从 ES 查询） POST /search/user/page */
export async function searchUserByPage(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePage>('/search/user/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
