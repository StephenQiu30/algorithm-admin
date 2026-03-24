/**
 * 文件上传状态枚举
 */
export enum FileUploadStatusEnum {
  /**
   * 上传成功
   */
  SUCCESS = 'SUCCESS',
  /**
   * 上传失败
   */
  FAILED = 'FAILED',
}

/**
 * 文件上传状态枚举映射
 */
export const FileUploadStatusEnumMap = {
  [FileUploadStatusEnum.SUCCESS]: {
    text: '成功',
    status: 'Success',
  },
  [FileUploadStatusEnum.FAILED]: {
    text: '失败',
    status: 'Error',
  },
};
