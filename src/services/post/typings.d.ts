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

  type BaseResponseLong = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: number;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePagePostCommentVO = {
    /** 状态码 */
    code?: number;
    data?: PagePostCommentVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePagePostVO = {
    /** 状态码 */
    code?: number;
    data?: PagePostVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePostCommentVO = {
    /** 状态码 */
    code?: number;
    data?: PostCommentVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePostVO = {
    /** 状态码 */
    code?: number;
    data?: PostVO;
    /** 消息 */
    message?: string;
  };

  type DeleteRequest = {
    /** id */
    id: number;
  };

  type exportPostParams = {
    id: number;
    type: string;
  };

  type getPostCommentVOByIdParams = {
    id: number;
  };

  type getPostVOByIdParams = {
    id: number;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PagePostCommentVO = {
    records?: PostCommentVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PagePostCommentVO;
    searchCount?: PagePostCommentVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PagePostVO = {
    records?: PostVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PagePostVO;
    searchCount?: PagePostVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PostAddRequest = {
    /** 标题 */
    title?: string;
    /** 内容 */
    content?: string;
    /** 封面 */
    cover?: string;
    /** 标签列表 */
    tags?: string[];
  };

  type PostCommentAddRequest = {
    /** 评论内容 */
    content?: string;
    /** 帖子ID */
    postId?: number;
    /** 父评论ID */
    parentId?: number;
  };

  type PostCommentEditRequest = {
    /** 评论ID */
    id?: number;
    /** 评论内容 */
    content?: string;
  };

  type PostCommentQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 评论ID */
    id?: number;
    /** 帖子ID */
    postId?: number;
    /** 评论用户ID */
    userId?: number;
    /** 父评论ID */
    parentId?: number;
    /** 评论内容 */
    content?: string;
  };

  type PostCommentUpdateRequest = {
    /** 评论ID */
    id?: number;
    /** 评论内容 */
    content?: string;
  };

  type PostCommentVO = {
    /** 评论ID */
    id?: number;
    /** 评论内容 */
    content?: string;
    /** 帖子ID */
    postId?: number;
    /** 用户ID */
    userId?: number;
    /** 父评论ID */
    parentId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    userVO?: UserVO;
    /** 子评论列表 */
    children?: PostCommentVO[];
  };

  type PostEditRequest = {
    /** 帖子ID */
    id?: number;
    /** 标题 */
    title?: string;
    /** 内容 */
    content?: string;
    /** 封面 */
    cover?: string;
    /** 标签列表 */
    tags?: string[];
  };

  type PostFavourQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 用户ID */
    userId?: number;
    postQueryRequest?: PostQueryRequest;
  };

  type PostFavourRequest = {
    /** 帖子ID */
    postId?: number;
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
  };

  type PostReviewRequest = {
    /** 帖子 ID */
    id?: number;
    /** 审核状态：1-通过，2-拒绝 */
    reviewStatus?: number;
    /** 审核信息 */
    reviewMessage?: string;
  };

  type PostThumbRequest = {
    /** 帖子ID */
    postId?: number;
  };

  type PostUpdateRequest = {
    /** 帖子ID */
    id?: number;
    /** 标题 */
    title?: string;
    /** 内容 */
    content?: string;
    /** 封面 */
    cover?: string;
    /** 标签列表 */
    tags?: string[];
  };

  type PostVO = {
    /** 帖子ID */
    id?: number;
    /** 标题 */
    title?: string;
    /** 内容 */
    content?: string;
    /** 封面 */
    cover?: string;
    /** 点赞数 */
    thumbNum?: number;
    /** 收藏数 */
    favourNum?: number;
    /** 用户ID */
    userId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 标签列表 */
    tags?: string[];
    userVO?: UserVO;
    /** 是否已点赞 */
    hasThumb?: boolean;
    /** 是否已收藏 */
    hasFavour?: boolean;
    /** 审核状态 */
    reviewStatus?: number;
    /** 审核信息 */
    reviewMessage?: string;
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
