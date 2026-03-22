export enum NotificationTypeEnum {
  /**
   * 系统通知
   */
  SYSTEM = 'system',

  /**
   * 用户通知
   */
  USER = 'user',

  /**
   * 评论通知
   */
  COMMENT = 'comment',

  /**
   * 点赞通知
   */
  LIKE = 'like',

  /**
   * 收藏通知
   */
  FAVOUR = 'favour',

  /**
   * 关注通知
   */
  FOLLOW = 'follow',

  /**
   * 审核通知
   */
  POST_REVIEW = 'post_review',

  /**
   * 全员广播
   */
  BROADCAST = 'broadcast',
}

export const NotificationTypeEnumMap = {
  [NotificationTypeEnum.SYSTEM]: {
    text: '系统通知',
    status: 'Default',
  },
  [NotificationTypeEnum.USER]: {
    text: '用户通知',
    status: 'Success',
  },
  [NotificationTypeEnum.COMMENT]: {
    text: '评论通知',
    status: 'Processing',
  },
  [NotificationTypeEnum.LIKE]: {
    text: '点赞通知',
    status: 'Error',
  },
  [NotificationTypeEnum.FAVOUR]: {
    text: '收藏通知',
    status: 'Warning',
  },
  [NotificationTypeEnum.FOLLOW]: {
    text: '关注通知',
    status: 'Warning',
  },
  [NotificationTypeEnum.POST_REVIEW]: {
    text: '审核通知',
    status: 'Processing',
  },
  [NotificationTypeEnum.BROADCAST]: {
    text: '全员广播',
    status: 'Processing',
  },
};
