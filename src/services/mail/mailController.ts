// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 异步发送邮件 基于 MQ 分离发送流程，提升接口吞吐量 POST /mail/send/async */
export async function doSendMailAsync(body: API.MailSendRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/mail/send/async', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 同步发送邮件 阻塞式发送简单或 HTML 邮件 POST /mail/send/sync */
export async function doSendMailSync(body: API.MailSendRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/mail/send/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送验证码邮件 按模板发送验证码内容，验证码由调用方生成并传入 POST /mail/send/verification-code */
export async function doSendVerificationCode(
  body: API.MailSendCodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/mail/send/verification-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
