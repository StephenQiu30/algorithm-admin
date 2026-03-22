/**
 * 登录状态枚举
 */
export enum LoginStatusEnum {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

/**
 * 登录状态枚举映射
 */
export const LoginStatusEnumMap = {
  [LoginStatusEnum.SUCCESS]: {
    text: '成功',
    status: 'Success',
  },
  '200': {
    text: '成功',
    status: 'Success',
  },
  [LoginStatusEnum.FAILURE]: {
    text: '失败',
    status: 'Error',
  },
  default: {
    text: '失败',
    status: 'Error',
  },
};
