declare namespace API {
  type BaseResponseBoolean = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: boolean;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePage = {
    /** 状态码 */
    code?: number;
    data?: Page;
    /** 消息 */
    message?: string;
  };

  type BaseResponseSearchVOObject = {
    /** 状态码 */
    code?: number;
    data?: SearchVOObject;
    /** 消息 */
    message?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type Page = {
    records?: Record<string, any>[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageObject;
    searchCount?: PageObject;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageObject = {
    records?: Record<string, any>[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageObject;
    searchCount?: PageObject;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PostEsDTO = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    title?: string;
    content?: string;
    cover?: string;
    tags?: string[];
    thumbNum?: number;
    favourNum?: number;
    userId?: number;
    contentType?: number;
    reviewStatus?: number;
    reviewMessage?: string;
    userVO?: UserVO;
  };

  type PostQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 帖子ID */
    id?: number;
    /** 排除的帖子ID */
    notId?: number;
    /** 搜索词 */
    searchText?: string;
    /** 标题 */
    title?: string;
    /** 内容 */
    content?: string;
    /** 标签列表 */
    tags?: string[];
    /** 至少有一个标签 */
    orTags?: string[];
    /** 创建用户ID */
    userId?: number;
    /** 收藏用户ID */
    favourUserId?: number;
    /** 审核状态 */
    reviewStatus?: number;
    /** 审核信息 */
    reviewMessage?: string;
    /** 内容类型(0-帖子 1-算法知识库) */
    contentType?: number;
  };

  type SearchRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 搜索词 */
    searchText?: string;
    /** 分类 */
    type?: string;
  };

  type SearchVOObject = {
    /** 数据列表 */
    dataList?: Record<string, any>[];
    /** 总条数 */
    total?: number;
    /** 当前页 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
  };

  type UserEsDTO = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    userEmail?: string;
    userPhone?: string;
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
