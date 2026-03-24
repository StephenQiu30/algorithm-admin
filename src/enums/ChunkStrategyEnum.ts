/**
 * 分片策略枚举
 */
export enum ChunkStrategyEnum {
  /**
   * 按 token 大小切分
   */
  TOKEN = 'token',
  /**
   * 递归字符切分
   */
  RECURSIVE = 'recursive',
  /**
   * 语义切分
   */
  SEMANTIC = 'semantic',
}

/**
 * 分片策略枚举映射
 */
export const ChunkStrategyEnumMap = {
  [ChunkStrategyEnum.TOKEN]: {
    text: 'Token 分片',
    status: 'blue',
  },
  [ChunkStrategyEnum.RECURSIVE]: {
    text: '递归分片',
    status: 'green',
  },
  [ChunkStrategyEnum.SEMANTIC]: {
    text: '语义分片',
    status: 'orange',
  },
};
