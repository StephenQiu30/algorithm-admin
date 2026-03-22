/**
 * API 访问状态枚举
 */
export enum ApiAccessStatusEnum {
  SUCCESS = 200,
}

/**
 * API 访问状态枚举映射
 */
export const ApiAccessStatusEnumMap = {
  [ApiAccessStatusEnum.SUCCESS]: {
    text: '成功',
    status: 'Success',
  },
  default: {
    text: '失败',
    status: 'Error',
  },
};
