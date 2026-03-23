/**
 * 文档解析状态枚举
 */
export enum DocumentParseStatusEnum {
  /**
   * 待解析
   */
  PENDING = 0,
  /**
   * 解析中
   */
  PROCESSING = 1,
  /**
   * 解析成功
   */
  SUCCESS = 2,
  /**
   * 解析失败
   */
  FAILED = 3,
}

/**
 * 文档解析状态枚举映射
 */
export const DocumentParseStatusEnumMap = {
  [DocumentParseStatusEnum.PENDING]: {
    text: '待解析',
    status: 'Default',
  },
  [DocumentParseStatusEnum.PROCESSING]: {
    text: '解析中',
    status: 'Processing',
  },
  [DocumentParseStatusEnum.SUCCESS]: {
    text: '解析成功',
    status: 'Success',
  },
  [DocumentParseStatusEnum.FAILED]: {
    text: '解析失败',
    status: 'Error',
  },
};
