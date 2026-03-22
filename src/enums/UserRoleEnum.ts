/**
 * 用户角色枚举
 */
export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  BAN = 'ban',
}

/**
 * 用户角色枚举
 */
export const userRole = {
  [UserRoleEnum.ADMIN]: {
    text: '管理员',
    status: 'Processing',
  },
  [UserRoleEnum.USER]: {
    text: '普通用户',
    status: 'Success',
  },
  [UserRoleEnum.BAN]: {
    text: '封禁',
    status: 'Error',
  },
};
