/**
 * 邮件发送状态枚举
 */
export enum EmailStatusEnum {
  /**
   * 等待发送
   */
  WAITING = 'WAITING',
  /**
   * 发送中
   */
  SENDING = 'SENDING',
  /**
   * 发送成功
   */
  SUCCESS = 'SUCCESS',
  /**
   * 发送失败
   */
  FAILURE = 'FAILURE',
}

/**
 * 邮件发送状态枚举映射
 */
export const EmailStatusEnumMap = {
  [EmailStatusEnum.WAITING]: {
    text: '等待发送',
    status: 'Default',
  },
  [EmailStatusEnum.SENDING]: {
    text: '发送中',
    status: 'Processing',
  },
  [EmailStatusEnum.SUCCESS]: {
    text: '发送成功',
    status: 'Success',
  },
  [EmailStatusEnum.FAILURE]: {
    text: '发送失败',
    status: 'Error',
  },
};
