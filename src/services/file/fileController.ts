// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 文件上传 统一样式的文件上传接口，支持按业务类型进行校验 POST /file/upload */
export async function uploadFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseFileUploadVO>('/file/upload', {
    method: 'POST',
    params: {
      ...params,
      fileUploadRequest: undefined,
      ...params['fileUploadRequest'],
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
