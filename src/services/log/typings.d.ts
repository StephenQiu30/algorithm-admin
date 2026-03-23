declare namespace API {
  type ApiAccessLogAddRequest = {
    /** 链路追踪ID */
    traceId?: string;
    /** 用户ID */
    userId?: number;
    /** HTTP方法 */
    method?: string;
    /** 请求路径 */
    path?: string;
    /** 查询参数 */
    query?: string;
    /** 响应状态码 */
    status?: number;
    /** 耗时毫秒 */
    latencyMs?: number;
    /** 客户端IP */
    clientIp?: string;
    /** User-Agent */
    userAgent?: string;
    /** Referer */
    referer?: string;
    /** 请求大小 */
    requestSize?: number;
    /** 响应大小 */
    responseSize?: number;
  };

  type ApiAccessLogQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 主键 */
    id?: number;
    /** 链路追踪ID */
    traceId?: string;
    /** 用户ID */
    userId?: number;
    /** HTTP方法 */
    method?: string;
    /** 请求路径 */
    path?: string;
    /** 响应状态码 */
    status?: number;
    /** 客户端IP */
    clientIp?: string;
    /** 搜索文本 */
    searchText?: string;
  };

  type ApiAccessLogVO = {
    /** 主键 */
    id?: number;
    /** 链路追踪ID */
    traceId?: string;
    /** 用户ID */
    userId?: number;
    /** HTTP方法 */
    method?: string;
    /** 请求路径 */
    path?: string;
    /** 查询参数 */
    query?: string;
    /** 响应状态码 */
    status?: number;
    /** 请求耗时(ms) */
    latencyMs?: number;
    /** 客户端IP */
    clientIp?: string;
    /** User-Agent */
    userAgent?: string;
    /** Referer */
    referer?: string;
    /** 请求大小 */
    requestSize?: number;
    /** 响应大小 */
    responseSize?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type BaseResponseBoolean = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: boolean;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageApiAccessLogVO = {
    /** 状态码 */
    code?: number;
    data?: PageApiAccessLogVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageEmailRecordVO = {
    /** 状态码 */
    code?: number;
    data?: PageEmailRecordVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageFileUploadRecordVO = {
    /** 状态码 */
    code?: number;
    data?: PageFileUploadRecordVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageOperationLogVO = {
    /** 状态码 */
    code?: number;
    data?: PageOperationLogVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageUserLoginLogVO = {
    /** 状态码 */
    code?: number;
    data?: PageUserLoginLogVO;
    /** 消息 */
    message?: string;
  };

  type DeleteRequest = {
    /** id */
    id: number;
  };

  type EmailRecordAddRequest = {
    /** 记录ID */
    id?: number;
    /** 消息ID */
    msgId?: string;
    /** 业务幂等ID */
    bizId?: string;
    /** 业务类型 */
    bizType?: string;
    /** 收件人邮箱 */
    toEmail?: string;
    /** 邮件主题 */
    subject?: string;
    /** 邮件内容 */
    content?: string;
    /** 是否HTML */
    isHtml?: number;
    /** 发送状态 */
    status?: string;
    /** 重试次数 */
    retryCount?: number;
    /** 最大重试次数 */
    maxRetry?: number;
    /** 错误信息 */
    errorMessage?: string;
    /** 发送渠道 */
    provider?: string;
    /** 发送时间 */
    sendTime?: string;
    /** 下次重试时间 */
    nextRetryTime?: string;
  };

  type EmailRecordQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 主键 */
    id?: number;
    /** 消息ID */
    msgId?: string;
    /** 业务幂等ID */
    bizId?: string;
    /** 业务类型 */
    bizType?: string;
    /** 收件人邮箱 */
    toEmail?: string;
    /** 发送状态 */
    status?: string;
    /** 搜索文本 */
    searchText?: string;
  };

  type EmailRecordVO = {
    /** 主键 */
    id?: number;
    /** 消息ID */
    msgId?: string;
    /** 业务幂等ID */
    bizId?: string;
    /** 业务类型 */
    bizType?: string;
    /** 收件人邮箱 */
    toEmail?: string;
    /** 邮件主题 */
    subject?: string;
    /** 邮件内容 */
    content?: string;
    /** 是否HTML */
    isHtml?: number;
    /** 发送状态 */
    status?: string;
    /** 重试次数 */
    retryCount?: number;
    /** 错误信息 */
    errorMessage?: string;
    /** 发送渠道 */
    provider?: string;
    /** 发送时间 */
    sendTime?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type FileUploadRecordAddRequest = {
    /** 上传用户ID */
    userId?: number;
    /** 业务类型 */
    bizType?: string;
    /** 原始文件名 */
    fileName?: string;
    /** 文件大小 */
    fileSize?: number;
    /** 文件后缀 */
    fileSuffix?: string;
    /** 内容类型 */
    contentType?: string;
    /** 存储类型 */
    storageType?: string;
    /** 存储桶 */
    bucket?: string;
    /** 对象键/路径 */
    objectKey?: string;
    /** 访问URL */
    url?: string;
    /** 文件MD5 */
    md5?: string;
    /** 客户端IP */
    clientIp?: string;
    /** 上传状态 */
    status?: string;
    /** 错误信息 */
    errorMessage?: string;
  };

  type FileUploadRecordQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 主键 */
    id?: number;
    /** 用户ID */
    userId?: number;
    /** 业务类型 */
    bizType?: string;
    /** 原始文件名 */
    fileName?: string;
    /** 上传状态 */
    status?: string;
    /** 搜索文本 */
    searchText?: string;
  };

  type FileUploadRecordVO = {
    /** 主键 */
    id?: number;
    /** 上传用户ID */
    userId?: number;
    /** 业务类型 */
    bizType?: string;
    /** 原始文件名 */
    fileName?: string;
    /** 文件大小 */
    fileSize?: number;
    /** 文件后缀 */
    fileSuffix?: string;
    /** 内容类型 */
    contentType?: string;
    /** 存储类型 */
    storageType?: string;
    /** 存储桶 */
    bucket?: string;
    /** 对象键/路径 */
    objectKey?: string;
    /** 访问URL */
    url?: string;
    /** 文件MD5 */
    md5?: string;
    /** 客户端IP */
    clientIp?: string;
    /** 上传状态 */
    status?: string;
    /** 错误信息 */
    errorMessage?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type OperationLogAddRequest = {
    /** 操作人ID */
    operatorId?: number;
    /** 操作人名称 */
    operatorName?: string;
    /** 模块 */
    module?: string;
    /** 操作类型 */
    action?: string;
    /** HTTP方法 */
    method?: string;
    /** 请求路径 */
    path?: string;
    /** 请求参数 */
    requestParams?: string;
    /** 响应状态码 */
    responseStatus?: number;
    /** 是否成功 */
    success?: number;
    /** 错误信息 */
    errorMessage?: string;
    /** 客户端IP */
    clientIp?: string;
    /** 归属地 */
    location?: string;
  };

  type OperationLogQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 主键 */
    id?: number;
    /** 操作人ID */
    operatorId?: number;
    /** 操作人名称 */
    operatorName?: string;
    /** 模块 */
    module?: string;
    /** 操作类型 */
    action?: string;
    /** 是否成功 */
    success?: number;
    /** 客户端IP */
    clientIp?: string;
    /** 搜索文本 */
    searchText?: string;
  };

  type OperationLogVO = {
    /** 主键 */
    id?: number;
    /** 操作人ID */
    operatorId?: number;
    /** 操作人名称 */
    operatorName?: string;
    /** 操作模块 */
    module?: string;
    /** 操作类型 */
    action?: string;
    /** HTTP方法 */
    method?: string;
    /** 请求路径 */
    path?: string;
    /** 请求参数 */
    requestParams?: string;
    /** 响应状态码 */
    responseStatus?: number;
    /** 是否成功 */
    success?: number;
    /** 错误信息 */
    errorMessage?: string;
    /** 客户端IP */
    clientIp?: string;
    /** 归属地 */
    location?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageApiAccessLogVO = {
    records?: ApiAccessLogVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageApiAccessLogVO;
    searchCount?: PageApiAccessLogVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageEmailRecordVO = {
    records?: EmailRecordVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageEmailRecordVO;
    searchCount?: PageEmailRecordVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageFileUploadRecordVO = {
    records?: FileUploadRecordVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageFileUploadRecordVO;
    searchCount?: PageFileUploadRecordVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageOperationLogVO = {
    records?: OperationLogVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageOperationLogVO;
    searchCount?: PageOperationLogVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserLoginLogVO = {
    records?: UserLoginLogVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserLoginLogVO;
    searchCount?: PageUserLoginLogVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type UserLoginLogAddRequest = {
    /** 用户ID */
    userId?: number;
    /** 登录账号 */
    account?: string;
    /** 登录类型 */
    loginType?: string;
    /** 登录状态 */
    status?: string;
    /** 失败原因 */
    failReason?: string;
    /** 客户端IP */
    clientIp?: string;
    /** 归属地 */
    location?: string;
    /** User-Agent */
    userAgent?: string;
  };

  type UserLoginLogQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 主键 */
    id?: number;
    /** 用户ID */
    userId?: number;
    /** 登录账号 */
    account?: string;
    /** 登录类型 */
    loginType?: string;
    /** 登录状态 */
    status?: string;
    /** 客户端IP */
    clientIp?: string;
    /** 搜索文本 */
    searchText?: string;
  };

  type UserLoginLogVO = {
    /** 主键 */
    id?: number;
    /** 用户ID */
    userId?: number;
    /** 登录账号 */
    account?: string;
    /** 登录类型 */
    loginType?: string;
    /** 登录状态 */
    status?: string;
    /** 失败原因 */
    failReason?: string;
    /** 客户端IP */
    clientIp?: string;
    /** 归属地 */
    location?: string;
    /** User-Agent */
    userAgent?: string;
    /** 创建时间 */
    createTime?: string;
  };
}
