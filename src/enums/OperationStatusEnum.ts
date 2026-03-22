/**
 * 操作状态枚举
 */
export enum OperationStatusEnum {
  /**
   * 失败
   */
  FAILURE = 0,
  /**
   * 成功
   */
  SUCCESS = 1,
}

/**
 * 操作状态枚举映射
 */
export const OperationStatusEnumMap = {
  [OperationStatusEnum.SUCCESS]: {
    text: '成功',
    status: 'Success',
  },
  [OperationStatusEnum.FAILURE]: {
    text: '失败',
    status: 'Error',
  },
};
