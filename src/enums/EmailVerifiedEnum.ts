/**
 * 邮箱验证状态枚举
 */
export enum EmailVerifiedEnum {
  /**
   * 未验证
   */
  UNVERIFIED = 0,
  /**
   * 已验证
   */
  VERIFIED = 1,
}

/**
 * 邮箱验证状态枚举映射
 */
export const EmailVerifiedEnumMap = {
  [EmailVerifiedEnum.UNVERIFIED]: {
    text: '未验证',
    status: 'Error',
  },
  [EmailVerifiedEnum.VERIFIED]: {
    text: '已验证',
    status: 'Success',
  },
};
