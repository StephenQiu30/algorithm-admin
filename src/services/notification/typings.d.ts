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

  type BaseResponseListLong = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: number[];
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

  type BaseResponseNotificationVO = {
    /** 状态码 */
    code?: number;
    data?: NotificationVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageNotification = {
    /** 状态码 */
    code?: number;
    data?: PageNotification;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageNotificationVO = {
    /** 状态码 */
    code?: number;
    data?: PageNotificationVO;
    /** 消息 */
    message?: string;
  };

  type DeleteRequest = {
    /** id */
    id: number;
  };

  type getNotificationVOByIdParams = {
    id: number;
  };

  type Notification = {
    /** 通知ID */
    id?: number;
    /** 通知标题 */
    title?: string;
    /** 通知内容 */
    content?: string;
    /** 通知类型（system-系统通知，user-用户通知，comment-评论通知，like-点赞通知，follow-关注通知，broadcast-全员广播） */
    type?: string;
    /** 业务幂等ID */
    bizId?: string;
    /** 接收用户ID */
    userId?: number;
    /** 关联对象ID */
    relatedId?: number;
    /** 关联对象类型 */
    relatedType?: string;
    /** 是否已读 */
    isRead?: number;
    /** 状态（0-正常，1-停用） */
    status?: number;
    /** 跳转链接 */
    contentUrl?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 是否删除 */
    isDelete?: number;
  };

  type NotificationAddRequest = {
    /** 发送目标标识 */
    target?: string;
    /** 通知标题 */
    title?: string;
    /** 通知内容 */
    content?: string;
    /** 跳转链接 */
    contentUrl?: string;
  };

  type NotificationBatchDeleteRequest = {
    /** 通知ID列表 */
    ids: number[];
  };

  type NotificationBatchReadRequest = {
    /** 通知ID列表 */
    ids: number[];
  };

  type NotificationQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 通知ID */
    id?: number;
    /** 通知类型 */
    type?: string;
    /** 接收用户ID */
    userId?: number;
    /** 是否已读 */
    isRead?: number;
    /** 状态 */
    status?: number;
    /** 关联对象类型 */
    relatedType?: string;
    /** 搜索文本 */
    searchText?: string;
  };

  type NotificationReadRequest = {
    /** 通知ID */
    id?: number;
  };

  type NotificationUpdateRequest = {
    /** 通知ID */
    id?: number;
    /** 通知标题 */
    title?: string;
    /** 通知内容 */
    content?: string;
    /** 通知类型 */
    type?: string;
    /** 接收用户ID */
    userId?: number;
    /** 关联对象ID */
    relatedId?: number;
    /** 关联对象类型 */
    relatedType?: string;
    /** 跳转链接 */
    contentUrl?: string;
  };

  type NotificationVO = {
    /** 通知ID */
    id?: number;
    /** 通知标题 */
    title?: string;
    /** 通知内容 */
    content?: string;
    /** 通知类型 */
    type?: string;
    /** 接收用户ID */
    userId?: number;
    userVO?: UserVO;
    /** 关联对象ID */
    relatedId?: number;
    /** 关联对象类型 */
    relatedType?: string;
    /** 是否已读 */
    isRead?: number;
    /** 状态 */
    status?: number;
    /** 跳转链接 */
    contentUrl?: string;
    /** 业务幂等ID */
    bizId?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageNotification = {
    records?: Notification[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageNotification;
    searchCount?: PageNotification;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageNotificationVO = {
    records?: NotificationVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageNotificationVO;
    searchCount?: PageNotificationVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
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
