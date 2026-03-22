/**
 * 用户角色枚举
 */
export enum ReviewStatusEnum {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

/**
 * 用户角色枚举
 */
export const reviewStatus = {
  [ReviewStatusEnum.REVIEWING]: {
    text: '审核中',
    status: 'Processing',
  },
  [ReviewStatusEnum.PASS]: {
    text: '审核通过',
    status: 'Success',
  },
  [ReviewStatusEnum.REJECT]: {
    text: '拒绝',
    status: 'Error',
  },
};
