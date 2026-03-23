declare namespace API {
  type AiChatRecordAddRequest = {
    /** 会话 id */
    sessionId?: string;
    /** 对话消息 */
    message?: string;
    /** AI 响应内容 */
    response?: string;
    /** 模型类型 */
    modelType?: string;
  };

  type AiChatRecordEditRequest = {
    /** 主键 ID */
    id?: number;
    /** 会话 ID */
    sessionId?: string;
    /** 对话消息 */
    message?: string;
    /** AI 响应内容 */
    response?: string;
    /** 模型类型 */
    modelType?: string;
  };

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

  type AiChatRecordUpdateRequest = {
    /** 主键 ID */
    id?: number;
    /** 会话 ID */
    sessionId?: string;
    /** 对话消息 */
    message?: string;
    /** AI 响应内容 */
    response?: string;
    /** 模型类型 */
    modelType?: string;
  };

  type AiChatRecordVO = {
    /** 主键 ID */
    id?: number;
    /** 用户 ID */
    userId?: number;
    /** 会话 ID */
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

  type BaseResponseAiChatRecordVO = {
    /** 状态码 */
    code?: number;
    data?: AiChatRecordVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseBoolean = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: boolean;
    /** 消息 */
    message?: string;
  };

  type BaseResponseDocumentChunk = {
    /** 状态码 */
    code?: number;
    data?: DocumentChunk;
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

  type BaseResponseKnowledgeDocumentVO = {
    /** 状态码 */
    code?: number;
    data?: KnowledgeDocumentVO;
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

  type BaseResponsePageDocumentChunk = {
    /** 状态码 */
    code?: number;
    data?: PageDocumentChunk;
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

  type BaseResponsePageKnowledgeDocumentVO = {
    /** 状态码 */
    code?: number;
    data?: PageKnowledgeDocumentVO;
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

  type DocumentChunk = {
    id?: number;
    documentId?: number;
    knowledgeBaseId?: number;
    chunkIndex?: number;
    content?: string;
    tokenEstimate?: number;
    createTime?: string;
  };

  type DocumentChunkAddRequest = {
    /** 所属文档 ID */
    documentId?: number;
    /** 所属知识库 ID */
    knowledgeBaseId?: number;
    /** 分片序号 */
    chunkIndex?: number;
    /** 分片正文内容 */
    content?: string;
    /** 分片 Token 估算值 */
    tokenEstimate?: number;
  };

  type DocumentChunkQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 文档 ID */
    documentId?: number;
    /** 知识库 ID */
    knowledgeBaseId?: number;
    /** 分片序号 */
    chunkIndex?: number;
  };

  type getAiChatRecordVOByIdParams = {
    id: number;
  };

  type getByIdParams = {
    /** 分片 ID */
    id: number;
  };

  type getDocumentVOByIdParams = {
    /** 文档 ID */
    id: number;
  };

  type getKnowledgeBaseVOByIdParams = {
    /** 知识库 ID */
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
    /** 主键 ID */
    id?: number;
    /** 知识库名称 */
    name?: string;
    /** 用户 ID */
    userId?: number;
  };

  type KnowledgeBaseUpdateRequest = {
    /** 主键 ID */
    id?: number;
    /** 知识库名称 */
    name?: string;
    /** 知识库描述 */
    description?: string;
    /** 状态 (0-启用, 1-禁用等) */
    status?: number;
  };

  type KnowledgeBaseVO = {
    /** 主键 ID */
    id?: number;
    /** 用户 ID */
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

  type KnowledgeDocumentEditRequest = {
    /** 主键 ID */
    id?: number;
    /** 原始文件名 */
    originalName?: string;
  };

  type KnowledgeDocumentQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 知识库 id */
    knowledgeBaseId?: number;
    /** 原始文件名 */
    originalName?: string;
    /** 解析状态 */
    parseStatus?: number;
  };

  type KnowledgeDocumentUpdateRequest = {
    /** 主键 ID */
    id?: number;
    /** 知识库 ID */
    knowledgeBaseId?: number;
    /** 原始文件名 */
    originalName?: string;
    /** 解析状态 */
    parseStatus?: number;
    /** 错误信息 */
    errorMsg?: string;
  };

  type KnowledgeDocumentVO = {
    /** 主键 ID */
    id?: number;
    /** 知识库 ID */
    knowledgeBaseId?: number;
    /** 原始文件名 */
    originalName?: string;
    /** 解析状态 (0-待解析, 1-解析中, 2-解析成功, 3-解析失败等) */
    parseStatus?: number;
    /** 错误信息 */
    errorMsg?: string;
    /** 文件大小 (字节) */
    sizeBytes?: number;
    /** 创建时间 */
    createTime?: string;
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

  type PageDocumentChunk = {
    records?: DocumentChunk[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageDocumentChunk;
    searchCount?: PageDocumentChunk;
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

  type PageKnowledgeDocumentVO = {
    records?: KnowledgeDocumentVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageKnowledgeDocumentVO;
    searchCount?: PageKnowledgeDocumentVO;
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
    /** 检索数量 */
    topK?: number;
  };

  type RagChatResponseVO = {
    /** AI 回答内容 */
    answer?: string;
    /** 参考资料源 */
    sources?: ChunkSourceVO[];
  };

  type uploadDocumentParams = {
    /** 关联的知识库 ID */
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
