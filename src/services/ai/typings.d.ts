declare namespace API {
  type AiChatRecord = {
    id?: number;
    userId?: number;
    sessionId?: string;
    message?: string;
    response?: string;
    modelType?: string;
    totalTokens?: number;
    promptTokens?: number;
    completionTokens?: number;
    postId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
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
    /** 搜索词 (匹配消息内容或响应) */
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
  };

  type AiChatRequest = {
    /** 问题内容 */
    message?: string;
    /** 模型类型 (dashscope: 通义千问) */
    modelType?: string;
    /** 会话 id */
    sessionId?: string;
    /** 帖子 ID (用于异步同步总结) */
    postId?: number;
    /** 系统提示词 (用于定义 AI 角色) */
    systemMessage?: string;
  };

  type AiChatResponse = {
    /** AI 回答的结果文本 */
    content?: string;
    /** 总消耗 token */
    totalTokens?: number;
    /** 提示消耗 token */
    promptTokens?: number;
    /** 生成消耗 token */
    completionTokens?: number;
  };

  type AiModelVO = {
    /** 模型名称 */
    name?: string;
    /** 模型描述 */
    description?: string;
  };

  type BaseResponseAiChatResponse = {
    /** 状态码 */
    code?: number;
    data?: AiChatResponse;
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

  type BaseResponseListAiModelVO = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: AiModelVO[];
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageAiChatRecord = {
    /** 状态码 */
    code?: number;
    data?: PageAiChatRecord;
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

  type DeleteRequest = {
    /** id */
    id: number;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageAiChatRecord = {
    records?: AiChatRecord[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageAiChatRecord;
    searchCount?: PageAiChatRecord;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
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

  type SseEmitter = {
    timeout?: number;
  };
}
