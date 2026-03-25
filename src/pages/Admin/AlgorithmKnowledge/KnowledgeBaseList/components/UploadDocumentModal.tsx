import { ModalForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { Alert, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
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
      title="上传知识库文档"
      open={visible}
      width={520}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
        maskClosable: false,
      }}
      submitter={{
        searchConfig: {
          submitText: '开始上传',
          resetText: '关闭',
        }
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
        const hide = message.loading('正在解析并上传至向量库...', 0);
        try {
          const res = await uploadDocument(
            { knowledgeBaseId },
            {},
            file
          );
          if (res.code === 0) {
            message.success({ 
                content: '文档上传成功，系统正在后台进行自动分片与索引',
                duration: 4
            });
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
      <Alert
        message="温馨提示"
        description="分片与索引过程可能耗时，视文档大小而定。完成后可在文档管理中查看解析状态。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      <ProFormUploadDragger
        label="文档文件 (Document File)"
        name="file"
        rules={[{ required: true, message: '请选择文件' }]}
        max={1}
        icon={<InboxOutlined style={{ color: '#1677ff' }} />}
        description={
            <div style={{ color: 'rgba(0, 0, 0, 0.45)', marginTop: 8 }}>
                支持 PDF, MD, TXT, DOCX 等常见格式。单文件上限建议 20MB。
            </div>
        }
        fieldProps={{
          beforeUpload: () => false,
          accept: '.pdf,.md,.txt,.docx,.doc',
        }}
      />
    </ModalForm>
  );
};

export default UploadDocumentModal;
