declare namespace API {
  type BaseResponseBoolean = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: boolean;
    /** 消息 */
    message?: string;
  };

  type BaseResponseInteger = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: number;
    /** 消息 */
    message?: string;
  };

  type BaseResponseListUserVO = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: UserVO[];
    /** 消息 */
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    /** 状态码 */
    code?: number;
    data?: LoginUserVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseLong = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: number;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageUser = {
    /** 状态码 */
    code?: number;
    data?: PageUser;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageUserVO = {
    /** 状态码 */
    code?: number;
    data?: PageUserVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseString = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: string;
    /** 消息 */
    message?: string;
  };

  type BaseResponseUser = {
    /** 状态码 */
    code?: number;
    data?: User;
    /** 消息 */
    message?: string;
  };

  type BaseResponseUserVO = {
    /** 状态码 */
    code?: number;
    data?: UserVO;
    /** 消息 */
    message?: string;
  };

  type DeleteRequest = {
    /** id */
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type getUserVOByIdsParams = {
    ids: number[];
  };

  type GitHubCallbackRequest = {
    /** 授权码 */
    code: string;
    /** 防CSRF攻击的随机字符串 */
    state: string;
  };

  type gitHubLoginCallbackParams = {
    request: GitHubCallbackRequest;
  };

  type GitHubLoginRequest = {
    /** 授权码 */
    code?: string;
    /** 防CSRF攻击的随机字符串 */
    state?: string;
  };

  type LoginUserVO = {
    /** 用户ID */
    id?: number;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户角色 */
    userRole?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 邮箱是否验证 */
    emailVerified?: number;
    /** GitHub用户名 */
    githubLogin?: string;
    /** GitHub主页 */
    githubUrl?: string;
    /** 用户电话 */
    userPhone?: string;
    /** 最后登录时间 */
    lastLoginTime?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 登录token */
    token?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUser;
    searchCount?: PageUser;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserVO;
    searchCount?: PageUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type User = {
    /** 用户ID */
    id?: number;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户角色：user/admin/ban */
    userRole?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 邮箱是否验证：0-未验证，1-已验证 */
    emailVerified?: number;
    /** 用户手机号 */
    userPhone?: string;
    /** GitHub ID */
    githubId?: string;
    /** GitHub 账号 */
    githubLogin?: string;
    /** GitHub 主页 */
    githubUrl?: string;
    /** 最后登录时间 */
    lastLoginTime?: string;
    /** 最后登录IP */
    lastLoginIp?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 是否删除 */
    isDelete?: number;
  };

  type UserAddRequest = {
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户角色 */
    userRole?: string;
    /** 用户邮箱 */
    userEmail?: string;
  };

  type UserEditRequest = {
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户电话 */
    userPhone?: string;
  };

  type UserEmailCodeSendRequest = {
    /** 邮箱 */
    email?: string;
  };

  type UserEmailLoginRequest = {
    /** 邮箱 */
    email?: string;
    /** 验证码 */
    code?: string;
  };

  type UserQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序方式 */
    sortOrder?: string;
    /** 用户ID */
    id?: number;
    /** 排除的用户ID */
    notId?: number;
    /** 用户昵称 */
    userName?: string;
    /** 用户角色 */
    userRole?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户电话 */
    userPhone?: string;
    /** 搜索文本 */
    searchText?: string;
  };

  type UserUpdateRequest = {
    /** 用户ID */
    id?: number;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户角色 */
    userRole?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户电话 */
    userPhone?: string;
  };

  type UserVO = {
    /** 用户ID */
    id?: number;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户角色 */
    userRole?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户电话 */
    userPhone?: string;
    /** GitHub 登录账号 */
    githubLogin?: string;
    /** GitHub 主页 */
    githubUrl?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };
}
