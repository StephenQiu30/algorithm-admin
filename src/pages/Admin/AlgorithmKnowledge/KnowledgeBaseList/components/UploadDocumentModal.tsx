import { ModalForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';
import { addDocument as uploadDocument } from '@/services/ai/documentController';

interface Props {
  knowledgeBaseId?: any;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

/**
 * 上传文档弹窗
 * @param props
 * @constructor
 */
const UploadDocumentModal: React.FC<Props> = (props) => {
  const { knowledgeBaseId, visible, onCancel, onSubmit } = props;

  return (
    <ModalForm
      title="上传文档"
      open={visible}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      onFinish={async (values: any) => {
        if (!knowledgeBaseId) {
          message.error('未选择知识库');
          return false;
        }
        const file = values.file?.[0]?.originFileObj;
        if (!file) {
          message.error('请选择文件');
          return false;
        }
        const hide = message.loading('正在上传...');
        try {
          // 注意：addDocument 在 OpenAPI 中定义为 JSON POST，但如果是文件上传，
          // 通常后端支持 Multipart 或者我们需要调整请求
          // 这里我们遵循 API 定义，如果后端确实是 /doc/add 且接受文件，通常是通过 params 传递 knowledgeBaseId
          const res = await uploadDocument(
            { knowledgeBaseId },
            {},
            file
          );
          if (res.code === 0) {
            message.success('上传成功');
            onSubmit?.();
            return true;
          } else {
            message.error(`上传失败: ${res.message}`);
          }
        } catch (error: any) {
          message.error(`上传报错: ${error.message}`);
        } finally {
          hide();
        }
        return false;
      }}
    >
      <ProFormUploadDragger
        label="文档文件"
        name="file"
        rules={[{ required: true, message: '请选择文件' }]}
        max={1}
        description="支持单次上传一个文件，仅限 PDF、Markdown、Text、Word 等格式"
        fieldProps={{
          beforeUpload: () => false, // 阻止自动上传
          accept: '.pdf,.md,.txt,.docx,.doc',
        }}
      />
    </ModalForm>
  );
};

export default UploadDocumentModal;
