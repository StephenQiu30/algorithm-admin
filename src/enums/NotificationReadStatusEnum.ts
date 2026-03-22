/**
 * 通知已读状态枚举
 */
export enum NotificationReadStatusEnum {
  /**
   * 未读
   */
  UNREAD = 0,
  /**
   * 已读
   */
  READ = 1,
}

/**
 * 通知已读状态枚举映射
 */
export const NotificationReadStatusEnumMap = {
  [NotificationReadStatusEnum.UNREAD]: {
    text: '未读',
    status: 'Error',
  },
  [NotificationReadStatusEnum.READ]: {
    text: '已读',
    status: 'Success',
  },
};
