declare namespace API {
  type addDocumentParams = {
    /** 知识库 ID */
    knowledgeBaseId: number;
  };

  type BaseResponseBoolean = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: boolean;
    /** 消息 */
    message?: string;
  };

  type BaseResponseChunkVO = {
    /** 状态码 */
    code?: number;
    data?: ChunkVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseDocumentVO = {
    /** 状态码 */
    code?: number;
    data?: DocumentVO;
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

  type BaseResponseListChunkVO = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: ChunkVO[];
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

  type BaseResponsePageChunkVO = {
    /** 状态码 */
    code?: number;
    data?: PageChunkVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageDocumentVO = {
    /** 状态码 */
    code?: number;
    data?: PageDocumentVO;
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

  type BaseResponsePageRAGHistoryVO = {
    /** 状态码 */
    code?: number;
    data?: PageRAGHistoryVO;
    /** 消息 */
    message?: string;
  };

  type ChunkQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 文档ID */
    documentId?: number;
    /** 知识库ID */
    knowledgeBaseId?: number;
  };

  type ChunkSearchRequest = {
    /** 检索内容 */
    query?: string;
    /** 知识库ID */
    knowledgeBaseId?: number;
    /** 文档ID */
    documentId?: number;
    /** 返回数量 */
    topK?: number;
    /** 相似度阈值 */
    similarityThreshold?: number;
  };

  type ChunkVO = {
    /** 分片ID（ES文档ID） */
    id?: string;
    /** 文档ID */
    documentId?: number;
    /** 文档名称 */
    documentName?: string;
    /** 知识库ID */
    knowledgeBaseId?: number;
    /** 分片索引 */
    chunkIndex?: number;
    /** 分片内容 */
    content?: string;
    /** 字符数 */
    wordCount?: number;
    /** 检索分数 */
    score?: number;
    /** 来源类型 */
    sourceType?: string;
    /** 命中原因 */
    matchReason?: string;
  };

  type DeleteRequest = {
    /** id */
    id: number;
  };

  type DocumentQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 文档ID */
    id?: number;
    /** 知识库ID */
    knowledgeBaseId?: number;
    /** 文档名称 */
    name?: string;
    /** 处理状态 */
    status?: string;
    /** 上传用户ID */
    userId?: number;
  };

  type DocumentVO = {
    /** 文档ID */
    id?: number;
    /** 知识库ID */
    knowledgeBaseId?: number;
    /** 文档名称 */
    name?: string;
    /** 文件大小 */
    fileSize?: number;
    /** 文件扩展名 */
    fileExtension?: string;
    /** 处理状态 */
    status?: string;
    /** 错误信息 */
    errorMessage?: string;
    /** 分片数量 */
    chunkCount?: number;
    userVO?: UserVO;
    /** 上传时间 */
    uploadTime?: string;
    /** 处理完成时间 */
    processEndTime?: string;
  };

  type getChunkVOByIdParams = {
    id: number;
  };

  type getDocumentVOByIdParams = {
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

  type KnowledgeBaseEditRequest = {
    /** 知识库ID */
    id?: number;
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
    /** 知识库ID */
    id?: number;
    /** 知识库名称 */
    name?: string;
    /** 搜索词 */
    searchText?: string;
    /** 创建用户ID */
    userId?: number;
  };

  type KnowledgeBaseUpdateRequest = {
    /** 知识库ID */
    id?: number;
    /** 知识库名称 */
    name?: string;
    /** 知识库描述 */
    description?: string;
  };

  type KnowledgeBaseVO = {
    /** 知识库ID */
    id?: number;
    /** 知识库名称 */
    name?: string;
    /** 知识库描述 */
    description?: string;
    /** 文档数量 */
    documentCount?: number;
    userVO?: UserVO;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageChunkVO = {
    records?: ChunkVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChunkVO;
    searchCount?: PageChunkVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageDocumentVO = {
    records?: DocumentVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageDocumentVO;
    searchCount?: PageDocumentVO;
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

  type PageRAGHistoryVO = {
    records?: RAGHistoryVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageRAGHistoryVO;
    searchCount?: PageRAGHistoryVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type RAGAskRequest = {
    /** 问题 */
    question?: string;
    /** 知识库ID */
    knowledgeBaseId?: number;
    /** 检索数量 */
    topK?: number;
  };

  type RAGHistoryQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 知识库ID */
    knowledgeBaseId?: number;
    /** 用户ID */
    userId?: number;
  };

  type RAGHistoryVO = {
    /** 历史ID */
    id?: number;
    /** 知识库ID */
    knowledgeBaseId?: number;
    /** 用户ID */
    userId?: number;
    /** 问题 */
    question?: string;
    /** 答案 */
    answer?: string;
    /** 来源 */
    sources?: SourceVO[];
    /** 响应时间(毫秒) */
    responseTime?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type SourceVO = {
    /** 文档ID */
    documentId?: number;
    /** 文档名称 */
    documentName?: string;
    /** 分片索引 */
    chunkIndex?: number;
    /** 分片内容 */
    content?: string;
    /** 相似度得分 */
    score?: number;
    /** 来源类型 */
    sourceType?: string;
    /** 版本 */
    version?: string;
    /** 业务标签 */
    bizTag?: string;
    /** 命中原因 */
    matchReason?: string;
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
