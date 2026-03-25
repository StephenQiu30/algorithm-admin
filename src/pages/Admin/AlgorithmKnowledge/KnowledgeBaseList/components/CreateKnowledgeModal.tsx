import { message } from 'antd';
import React from 'react';
import { ModalForm, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { addKnowledgeBase } from '@/services/ai/knowledgeBaseController';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => void;
}

/**
 * 新建知识库弹窗
 * @param props
 * @constructor
 */
const CreateKnowledgeModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit } = props;
  const [form] = ProForm.useForm<API.KnowledgeBaseAddRequest>();

  return (
    <ModalForm<API.KnowledgeBaseAddRequest>
      title="新建算法知识库"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await addKnowledgeBase({
            ...values,
          });
          if (res.code === 0) {
            message.success('创建成功');
            onSubmit?.();
            return true;
          } else {
            message.error(`创建失败: ${res.message}`);
          }
        } catch (error: any) {
          message.error(`创建报错: ${error.message}`);
        }
        return false;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      submitter={{
        searchConfig: {
          submitText: '新建',
          resetText: '取消',
        },
      }}
    >
      <ProFormText
        name="name"
        label="知识库名称 (Name)"
        rules={[{ required: true, message: '请输入知识库名称' }]}
        placeholder="例如：高性能计算算法库"
      />
      <ProFormTextArea
        name="description"
        label="知识库描述 (Description)"
        placeholder="简要描述该知识库的应用领域或包含的文档类型"
      />
    </ModalForm>
  );
};
export default CreateKnowledgeModal;
