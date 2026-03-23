declare namespace API {
  type AiChatRecordQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** id */
    id?: number;
    /** 用户 id */
    userId?: number;
    /** 会话 id */
    sessionId?: string;
    /** 模型类型 */
    modelType?: string;
    /** 搜索关键词 */
    searchText?: string;
  };

  type AiChatRecordVO = {
    /** 主键 */
    id?: number;
    /** 用户 id */
    userId?: number;
    /** 会话 id */
    sessionId?: string;
    /** 对话消息 */
    message?: string;
    /** AI 响应内容 */
    response?: string;
    /** 模型类型 */
    modelType?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    userVO?: UserVO;
  };

  type BaseResponseBoolean = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: boolean;
    /** 消息 */
    message?: string;
  };

  type BaseResponseKnowledgeBaseVO = {
    /** 状态码 */
    code?: number;
    data?: KnowledgeBaseVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseListChunkSourceVO = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: ChunkSourceVO[];
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

  type BaseResponsePageAiChatRecordVO = {
    /** 状态码 */
    code?: number;
    data?: PageAiChatRecordVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageKnowledgeBaseVO = {
    /** 状态码 */
    code?: number;
    data?: PageKnowledgeBaseVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseRagChatResponseVO = {
    /** 状态码 */
    code?: number;
    data?: RagChatResponseVO;
    /** 消息 */
    message?: string;
  };

  type ChunkSourceVO = {
    /** 切片 ID */
    chunkId?: number;
    /** 切片内容 */
    content?: string;
    /** 文档 ID */
    documentId?: number;
    /** 文档名称 */
    documentName?: string;
    /** 相似度分数 */
    score?: number;
  };

  type DeleteRequest = {
    /** id */
    id: number;
  };

  type getKnowledgeBaseVOByIdParams = {
    id: number;
  };

  type KnowledgeBaseAddRequest = {
    /** 知识库名称 */
    name?: string;
    /** 知识库描述 */
    description?: string;
  };

  type KnowledgeBaseQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** id */
    id?: number;
    /** 知识库名称 */
    name?: string;
    /** 用户 id */
    userId?: number;
  };

  type KnowledgeBaseUpdateRequest = {
    /** id */
    id?: number;
    /** 知识库名称 */
    name?: string;
    /** 知识库描述 */
    description?: string;
    /** 状态 */
    status?: number;
  };

  type KnowledgeBaseVO = {
    /** id */
    id?: number;
    /** 用户 id */
    userId?: number;
    /** 知识库名称 */
    name?: string;
    /** 知识库描述 */
    description?: string;
    /** 状态 */
    status?: number;
    /** 创建时间 */
    createTime?: string;
    userVO?: UserVO;
  };

  type KnowledgeRetrievalRequest = {
    /** 知识库 ID */
    knowledgeBaseId?: number;
    /** 查询内容 */
    query?: string;
    /** 检索数量 */
    topK?: number;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageAiChatRecordVO = {
    records?: AiChatRecordVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageAiChatRecordVO;
    searchCount?: PageAiChatRecordVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageKnowledgeBaseVO = {
    records?: KnowledgeBaseVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageKnowledgeBaseVO;
    searchCount?: PageKnowledgeBaseVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type RagChatRequest = {
    /** 知识库 ID */
    knowledgeBaseId?: number;
    /** 问题内容 */
    question?: string;
    /** 会话 ID */
    sessionId?: string;
    /** 检索 topK */
    topK?: number;
  };

  type RagChatResponseVO = {
    /** AI 回答内容 */
    answer?: string;
    /** 参考资料源 */
    sources?: ChunkSourceVO[];
  };

  type uploadDocumentParams = {
    /** 所属知识库 ID */
    knowledgeBaseId: number;
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
