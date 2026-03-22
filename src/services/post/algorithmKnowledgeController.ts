// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建知识库条目（管理员） POST /post/knowledge/add */
export async function add(body: API.PostAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/post/knowledge/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除知识库条目 POST /post/knowledge/delete */
export async function deleteUsingPost(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/post/knowledge/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 知识库详情 GET /post/knowledge/get/vo */
export async function getVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVoParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePostVO>('/post/knowledge/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 知识库公开列表 POST /post/knowledge/list/page/vo */
export async function listVoByPage(body: API.PostQueryRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePagePostVO>('/post/knowledge/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
