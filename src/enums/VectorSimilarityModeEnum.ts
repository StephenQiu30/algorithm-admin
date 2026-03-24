/**
 * 向量相似度模式枚举
 */
export enum VectorSimilarityModeEnum {
  /**
   * 纯向量 kNN
   */
  KNN = 'knn',
  /**
   * 混合检索 Hybrid
   */
  HYBRID = 'hybrid',
}

/**
 * 向量相似度模式枚举映射
 */
export const VectorSimilarityModeEnumMap = {
  [VectorSimilarityModeEnum.KNN]: {
    text: '纯向量 kNN',
    status: 'cyan',
  },
  [VectorSimilarityModeEnum.HYBRID]: {
    text: '混合检索 Hybrid',
    status: 'purple',
  },
};
