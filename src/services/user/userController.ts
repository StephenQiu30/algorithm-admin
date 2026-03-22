// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /user/add */
export async function addUser(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 删除指定 ID 的用户，需具备相应权限 POST /user/delete */
export async function deleteUser(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/edit */
export async function editUser(body: API.UserEditRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 ID 获取用户详情 管理员获取指定用户的原始实体信息 GET /user/get */
export async function getUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser>('/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登录用户 获取系统当前登录的用户信息 GET /user/get/login */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据 ID 获取脱敏信息 获取指定用户的脱敏后的视图数据 GET /user/get/vo */
export async function getUserVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/user/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/get/vo/batch */
export async function getUserVoByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOByIdsParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserVO>('/user/get/vo/batch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 是否管理员 返回当前登录用户是否为管理员 GET /user/is/admin */
export async function isAdmin(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/is/admin', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/list/page */
export async function listUserByPage(body: API.UserQueryRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePageUser>('/user/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/list/page/vo */
export async function listUserVoByPage(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO>('/user/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户邮箱登录 使用邮箱 and 验证码进行登录 POST /user/login/email */
export async function userLoginByEmail(
  body: API.UserEmailLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO>('/user/login/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送邮箱验证码 向指定邮箱发送登录或注册所需的验证码 POST /user/login/email/code */
export async function sendEmailLoginCode(
  body: API.UserEmailCodeSendRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/user/login/email/code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取 GitHub 授权 URL 获取跳转到 GitHub 授权页面的 URL GET /user/login/github */
export async function getGitHubAuthorizeUrl(options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/user/login/github', {
    method: 'GET',
    ...(options || {}),
  });
}

/** GitHub 登录 通过 GitHub 授权码进行登录或注册 POST /user/login/github */
export async function userLoginByGitHub(
  body: API.GitHubLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO>('/user/login/github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** GitHub 登录回调 用于接收 GitHub 授权重定向后的回调请求 GET /user/login/github/callback */
export async function gitHubLoginCallback(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.gitHubLoginCallbackParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO>('/user/login/github/callback', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 用户注销 退出当前登录状态 POST /user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/update */
export async function updateUser(body: API.UserUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
