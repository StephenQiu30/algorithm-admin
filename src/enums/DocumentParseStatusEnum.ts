/**
 * 文档解析状态枚举
 */
export enum DocumentParseStatusEnum {
  /**
   * 待解析
   */
  PENDING = 'PENDING',
  /**
   * 解析中
   */
  PROCESSING = 'PROCESSING',
  /**
   * 解析完成
   */
  COMPLETED = 'COMPLETED',
  /**
   * 解析失败
   */
  FAILED = 'FAILED',
  /**
   * 解析超时
   */
  TIMEOUT = 'TIMEOUT',
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
  [DocumentParseStatusEnum.COMPLETED]: {
    text: '解析完成',
    status: 'Success',
  },
  [DocumentParseStatusEnum.FAILED]: {
    text: '解析失败',
    status: 'Error',
  },
  [DocumentParseStatusEnum.TIMEOUT]: {
    text: '解析超时',
    status: 'Warning',
  },
};
