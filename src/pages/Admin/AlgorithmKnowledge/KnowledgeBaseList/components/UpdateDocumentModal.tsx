import { ModalForm, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';
import { updateDocument } from '@/services/ai/knowledgeDocumentController';

interface Props {
  oldData?: API.KnowledgeDocumentVO;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

/**
 * 更新文档信息弹窗
 * @param props
 * @constructor
 */
const UpdateDocumentModal: React.FC<Props> = (props) => {
  const { oldData, visible, onCancel, onSubmit } = props;

  if (!oldData) return null;

  return (
    <ModalForm
      title="更新文档信息"
      open={visible}
      initialValues={oldData}
      onOpenChange={(v) => {
        if (!v) onCancel();
      }}
      onFinish={async (values: API.KnowledgeDocumentUpdateRequest) => {
        try {
          const res = await updateDocument({
            id: oldData.id,
            ...values,
          });
          if (res.code === 0) {
            message.success('更新成功');
            onSubmit();
            return true;
          } else {
            message.error(`更新失败: ${res.message}`);
          }
        } catch (error: any) {
          message.error(`更新报错: ${error.message}`);
        }
        return false;
      }}
    >
      <ProFormText
        label="文件名"
        name="originalName"
        rules={[{ required: true, message: '请输入文件名' }]}
      />
      <ProFormText
        label="标签"
        name="tags"
        placeholder="请输入标签，以逗号分隔"
      />
      <ProFormSwitch
        label="包含代码"
        name="hasCode"
      />
    </ModalForm>
  );
};

export default UpdateDocumentModal;
