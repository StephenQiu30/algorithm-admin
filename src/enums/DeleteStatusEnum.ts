/**
 * 删除状态枚举
 */
export enum DeleteStatusEnum {
  /**
   * 正常
   */
  NORMAL = 0,
  /**
   * 已删除
   */
  DELETED = 1,
}

/**
 * 删除状态枚举映射
 */
export const DeleteStatusEnumMap = {
  [DeleteStatusEnum.NORMAL]: {
    text: '正常',
    status: 'Success',
  },
  [DeleteStatusEnum.DELETED]: {
    text: '已删除',
    status: 'Error',
  },
};
