/**
 * 知识库状态枚举
 */
export enum KnowledgeBaseStatusEnum {
  /**
   * 正常
   */
  NORMAL = 0,
  /**
   * 禁用
   */
  DISABLED = 1,
}

/**
 * 知识库状态枚举映射
 */
export const KnowledgeBaseStatusEnumMap = {
  [KnowledgeBaseStatusEnum.NORMAL]: {
    text: '正常',
    status: 'Success',
  },
  [KnowledgeBaseStatusEnum.DISABLED]: {
    text: '禁用',
    status: 'Error',
  },
};
